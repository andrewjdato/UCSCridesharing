//
//  RiderPlannedSubmitViewController.swift
//  Slug Ride 2
//
//  Created by Andrew Dato
//  Copyright © 2017 Andrew Dat0. All rights reserved.
//


import Foundation
import UIKit
import GoogleMaps
import GooglePlaces
import SwiftyJSON
import Alamofire

class RPSViewController : UIViewController, GMSMapViewDelegate ,  CLLocationManagerDelegate, UIPickerViewDelegate, UIPickerViewDataSource{
    
    
    
    @IBOutlet weak var move_button: UIButton!
    @IBOutlet weak var startLoc: UILabel!
    @IBOutlet weak var destLoc: UILabel!
    @IBOutlet weak var startloc_button: UIButton!
    @IBOutlet weak var destloc_button: UIButton!
    @IBOutlet weak var submit_button: UIButton!
    
    @IBOutlet weak var mon_switch: UISwitch!
    @IBOutlet weak var tue_switch: UISwitch!
    @IBOutlet weak var wed_switch: UISwitch!
    @IBOutlet weak var thu_switch: UISwitch!
    @IBOutlet weak var fri_switch: UISwitch!
    @IBOutlet weak var sat_switch: UISwitch!
    @IBOutlet weak var sun_switch: UISwitch!
    
    
    
    let hour = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
    
    let minute = [00,05,10,15,20,25,30,35,40,45,50,55]
    
    
    var monday: Bool = false
    var tuesday: Bool = false
    var wednesday: Bool = false
    var thursday: Bool = false
    var friday: Bool = false
    var saturday: Bool = false
    var sunday: Bool = false
    var selhour: Int = 0
    var selminute: Int = 0
    var startLong : Double = 0
    var startLat : Double = 0
    var endLong : Double = 0
    var endLat : Double = 0
    
    @IBOutlet weak var hourPicker: UIPickerView!
    @IBOutlet weak var minutePicker: UIPickerView!
    
    var locationManager = CLLocationManager()
    var locationSelected = Location.startLocation
    
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        if pickerView == hourPicker {
            return self.hour.count
        } else {
            return self.minute.count
        }
    }
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        if pickerView == hourPicker {
            return "\(self.hour[row]) : "
        } else {
            if self.minute[row] < 10 {
                return "0\(self.minute[row])"
            } else {
                return "\(self.minute[row])"
            }
        }
    }
    
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        if pickerView == hourPicker {
            self.selhour = self.hour[row]
        } else {
            
            self.selminute = self.minute[row]
        }
    }
    
    
    override func viewDidLoad() {
        
        super.viewDidLoad()
        self.navigationController?.isNavigationBarHidden = false
        move_button.isEnabled = false
        hourPicker.delegate = self
        hourPicker.dataSource = self
        minutePicker.delegate = self
        minutePicker.dataSource = self
        
        mon_switch.setOn(false, animated: false)
        tue_switch.setOn(false, animated: false)
        wed_switch.setOn(false, animated: false)
        thu_switch.setOn(false, animated: false)
        fri_switch.setOn(false, animated: false)
        sat_switch.setOn(false, animated: false)
        sun_switch.setOn(false, animated: false)
        
        locationManager = CLLocationManager()
        locationManager.delegate = self
        locationManager.requestWhenInUseAuthorization()
        locationManager.startUpdatingLocation()
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
        locationManager.startMonitoringSignificantLocationChanges()
        
    }
    
    @IBAction func mon_flip(_ sender: UISwitch) {
        if sender.isOn == true {
            self.monday = true
        } else {
            self.monday = false
        }
    }
    
    @IBAction func tue_flip(_ sender: UISwitch) {
        print("check")
        if sender.isOn == true {
            self.tuesday = true
            print("check 2")
        } else {
            self.tuesday = false
            print("check 3")
        }
    }
    
    @IBAction func wed_flip(_ sender: UISwitch) {
        if sender.isOn == true {
            self.wednesday = true
        } else {
            self.wednesday = false
        }
    }
    
    @IBAction func thu_flip(_ sender: UISwitch) {
        if sender.isOn == true {
            self.thursday = true
        } else {
            self.thursday = false
        }
    }
    
    @IBAction func fri_flip(_ sender: UISwitch) {
        if sender.isOn == true {
            self.friday = true
        } else {
            self.friday = false
        }
    }
    
    @IBAction func sat_flip(_ sender: UISwitch) {
        if sender.isOn == true {
            self.saturday = true
        } else {
            self.saturday = false
        }
    }
    
    
    @IBAction func sun_flip(_ sender: UISwitch) {
        if sender.isOn == true {
            self.sunday = true
        } else {
            self.sunday = false
        }
    }
    
    @IBAction func submit_press(_ sender: Any) {
        if  self.monday == false &&
            self.tuesday == false &&
            self.wednesday == false &&
            self.thursday == false &&
            self.friday == false &&
            self.saturday == false &&
            self.sunday == false  {
            print("Pick a Day")
            return
        }  else if startLong == 0 && startLat == 0 {
            print("Pick a Location")
            return
        }  else if endLong == 0 && endLat == 0{
            print("Pick a Destination")
            return
        }   else {
            let appDelegate = UIApplication.shared.delegate as! AppDelegate
            let mon:Bool = self.monday
            let tue:Bool = self.tuesday
            let wed:Bool = self.wednesday
            let thu:Bool = self.thursday
            let fri:Bool = self.friday
            let sat:Bool = self.saturday
            let sun:Bool = self.sunday
            //let session = URLSession.shared
            let dict = ["rider_email":appDelegate.user_email, "rider_departure_longitude":self.startLong, "rider_departure_latitude":self.startLat, "rider_destination_longitude":self.endLong, "rider_destination_latitude":self.endLat, "rider_timeofdeparture_hour":self.selhour, "rider_timeofdeparture_minute":self.selminute, "monday":mon, "tuesday":tue, "wednesday":wed, "thursday":thu, "friday":fri, "saturday":sat, "sunday":sun] as [String: Any]
            print(dict)
            if let jsonData = try? JSONSerialization.data(withJSONObject: dict, options: .prettyPrinted) {
                
                print("success")
                let url = NSURL(string: "http://138.68.252.198:8000/rideshare/new_proposed_trip/")!
                let request = NSMutableURLRequest(url: url as URL)
                request.httpMethod = "POST"
                request.addValue("application/json", forHTTPHeaderField: "Content-Type")
                request.httpBody = jsonData
                
                
                let task = URLSession.shared.dataTask(with: request as URLRequest) { data, response, error in
                    if let httpResponse = response as? HTTPURLResponse {
                        print(httpResponse.statusCode)
                        if(httpResponse.statusCode != 200) {
                            print("error")
                            return
                        }
                    }
                    guard error == nil else {
                        print(error!)
                        return
                    }
                    guard let data = data else {
                        print("Data is empty")
                        return
                    }
                    //let json = try! JSONSerialization.jsonObject(with: data, options: []) as AnyObject
                    //print(json)
                    DispatchQueue.main.async(execute: self.submitDone)
                    //let storyBoard: UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
                    //let newViewController = storyBoard.instantiateViewController(withIdentifier: "MenuViewController") as! MenuViewController
                    //self.present(newViewController, animated: true, completion: nil)
                }
                
                task.resume()
                
                
            }
            
        }
        
        
    }
    
    func submitDone() {
        startLoc.isEnabled = false
        destLoc.isEnabled = false
        
        submit_button.isEnabled = false
        move_button.isEnabled = true
        mon_switch.isEnabled  = false
        tue_switch.isEnabled  = false
        wed_switch.isEnabled  = false
        thu_switch.isEnabled  = false
        fri_switch.isEnabled  = false
        sat_switch.isEnabled  = false
        sun_switch.isEnabled  = false
        
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        while !appDelegate.rider_dayChecker.isEmpty {
            appDelegate.rider_dayChecker.remove(at: 0)
        }
        appDelegate.rider_dayChecker.append(self.monday)
        appDelegate.rider_dayChecker.append(self.tuesday)
        appDelegate.rider_dayChecker.append(self.wednesday)
        appDelegate.rider_dayChecker.append(self.thursday)
        appDelegate.rider_dayChecker.append(self.friday)
        appDelegate.rider_dayChecker.append(self.saturday)
        appDelegate.rider_dayChecker.append(self.sunday)
        print(appDelegate.rider_dayChecker)
        
        submit_button.setTitle("Submitted", for: .normal)
    }
    
    @IBAction func move(_ sender: Any) {
        let newViewController = RiderPickController()
        self.navigationController?.pushViewController(newViewController, animated: true)
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        self.navigationController?.isNavigationBarHidden = false
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        self.navigationController?.isNavigationBarHidden = true
    }
    
    @IBAction func openStartLocation(_ sender: UIButton) {
        
        let autoCompleteController = GMSAutocompleteViewController()
        autoCompleteController.delegate = self
        
        // selected location
        locationSelected = .startLocation
        
        // Change text color
        UISearchBar.appearance().setTextColor(color: UIColor.black)
        self.locationManager.stopUpdatingLocation()
        
        self.present(autoCompleteController, animated: true, completion: nil)
    }
    
    @IBAction func openDestinationLocation(_ sender: UIButton) {
        
        let autoCompleteController = GMSAutocompleteViewController()
        autoCompleteController.delegate = self
        
        // selected location
        locationSelected = .destinationLocation
        
        // Change text color
        UISearchBar.appearance().setTextColor(color: UIColor.black)
        self.locationManager.stopUpdatingLocation()
        
        self.present(autoCompleteController, animated: true, completion: nil)
    }
    
}


// MARK: - GMS Auto Complete Delegate, for autocomplete search location
extension RPSViewController : GMSAutocompleteViewControllerDelegate {
    
    func viewController(_ viewController: GMSAutocompleteViewController, didFailAutocompleteWithError error: Error) {
        print("Error \(error)")
    }
    
    func viewController(_ viewController: GMSAutocompleteViewController, didAutocompleteWith place: GMSPlace) {
        
        // Change map location
        //let camera = GMSCameraPosition.camera(withLatitude: place.coordinate.latitude, longitude: place.coordinate.longitude, zoom: 16.0
        //)
        
        // set coordinate to text
        if locationSelected == .startLocation {
            startLoc.text = place.name
            startLong = place.coordinate.longitude
            startLat = place.coordinate.latitude
            //locationStart = CLLocation(latitude: place.coordinate.latitude, longitude: place.coordinate.longitude)
            //createMarker(titleMarker: "Location Start", iconMarker: #imageLiteral(resourceName: "mapspin"), latitude: place.coordinate.latitude, longitude: place.coordinate.longitude)
        } else if locationSelected == .destinationLocation {
            destLoc.text = place.name
            endLong = place.coordinate.longitude
            endLat = place.coordinate.latitude
            //destinationLocation.text = "\(place.coordinate.latitude), \(place.coordinate.longitude)"
            //locationEnd = CLLocation(latitude: place.coordinate.latitude, longitude: place.coordinate.longitude)
            //createMarker(titleMarker: "Location End", iconMarker: #imageLiteral(resourceName: "mapspin"), latitude: place.coordinate.latitude, longitude: place.coordinate.longitude)
        } else if locationSelected == .wptLocation{
            //wptLocation.text = "\(place.coordinate.latitude), \(place.coordinate.longitude)"
            //locationWaypoint = CLLocation(latitude: place.coordinate.latitude, longitude: place.coordinate.longitude)
            //createMarker(titleMarker: "Waypoint", iconMarker: #imageLiteral(resourceName: "mapspin"), latitude: place.coordinate.latitude, longitude: place.coordinate.longitude)
        }
        
        
        //self.googleMaps.camera = camera
        self.dismiss(animated: true, completion: nil)
        
    }
    
    func wasCancelled(_ viewController: GMSAutocompleteViewController) {
        self.dismiss(animated: true, completion: nil)
    }
    
    func didRequestAutocompletePredictions(_ viewController: GMSAutocompleteViewController) {
        UIApplication.shared.isNetworkActivityIndicatorVisible = true
    }
    
    func didUpdateAutocompletePredictions(_ viewController: GMSAutocompleteViewController) {
        UIApplication.shared.isNetworkActivityIndicatorVisible = false
    }
    
}




/*
 import Foundation
 import UIKit
 
 class RiderPlannedSubmitViewController : UIViewController{
 @IBOutlet weak var rp_location: UITextField!
 @IBOutlet weak var rp_destination: UITextField!
 @IBOutlet weak var rp_time: UITextField!
 @IBOutlet weak var rideSelect: UIButton!
 @IBOutlet weak var submit_button: UIButton!
 
 @IBOutlet weak var monday_button: UIButton!
 @IBOutlet weak var tuesday_button: UIButton!
 @IBOutlet weak var wednesday_button: UIButton!
 @IBOutlet weak var thursday_button: UIButton!
 @IBOutlet weak var friday_button: UIButton!
 @IBOutlet weak var saturday_button: UIButton!
 @IBOutlet weak var sunday_button: UIButton!
 
 @IBOutlet weak var monday_label: UILabel!
 @IBOutlet weak var tueday_label: UILabel!
 @IBOutlet weak var wednesday_label: UILabel!
 @IBOutlet weak var thursday_label: UILabel!
 @IBOutlet weak var friday_label: UILabel!
 @IBOutlet weak var saturday_label: UILabel!
 @IBOutlet weak var sunday_label: UILabel!
 
 var monday: Bool = false
 var tuesday: Bool = false
 var wednesday: Bool = false
 var thursday: Bool = false
 var friday: Bool = false
 var saturday: Bool = false
 var sunday: Bool = false
 
 
 override func viewDidLoad() {
 super.viewDidLoad()
 self.navigationController?.isNavigationBarHidden = false
 rideSelect.isEnabled = false;
 monday_label.text = "Mon   "
 tueday_label.text = "Tue   "
 wednesday_label.text = "Wed   "
 thursday_label.text = "Thu   "
 friday_label.text = "Fri   "
 saturday_label.text = "Sat   "
 sunday_label.text = "Sun   "
 
 }
 
 @IBAction func monday_press(_ sender: Any) {
 if self.monday == false {
 monday_label.text = "Mon  X"
 self.monday = true
 } else {
 monday_label.text = "Mon   "
 self.monday = false
 }
 }
 @IBAction func tueday_press(_ sender: Any) {
 if self.tuesday == false {
 tueday_label.text = "Tue   X"
 self.tuesday = true
 } else {
 tueday_label.text = "Tue   "
 self.tuesday = false
 }
 }
 @IBAction func wednesday_press(_ sender: Any) {
 if self.wednesday == false {
 wednesday_label.text = "Wed  X"
 self.wednesday = true
 } else {
 wednesday_label.text = "Wed   "
 self.wednesday = false
 }
 }
 
 @IBAction func thursday_press(_ sender: Any) {
 if self.thursday == false {
 thursday_label.text = "Thu   X"
 self.thursday = true
 } else {
 thursday_label.text = "Thu   "
 self.thursday = false
 }
 }
 @IBAction func friday_press(_ sender: Any) {
 if self.friday == false {
 friday_label.text = "Fri     X"
 self.friday = true
 } else {
 friday_label.text = "Fri   "
 self.friday = false
 }
 }
 @IBAction func saturday_press(_ sender: Any) {
 if self.saturday == false {
 saturday_label.text = "Sat    X"
 self.saturday = true
 } else {
 saturday_label.text = "Sat   "
 self.saturday = false
 }
 }
 @IBAction func sunday_press(_ sender: Any) {
 if self.sunday == false {
 sunday_label.text = "Sun   X"
 self.sunday = true
 } else {
 sunday_label.text = "Sun   "
 self.sunday = false
 }
 }
 
 @IBAction func submit_press(_ sender: Any) {
 if  self.monday == false &&
 self.tuesday == false &&
 self.wednesday == false &&
 self.thursday == false &&
 self.friday == false &&
 self.saturday == false &&
 self.sunday == false  {
 print("Pick a Day")
 return
 } else if let text = rp_location.text, text.isEmpty  {
 print("Insert a Location")
 return
 } else if let text = rp_destination.text, text.isEmpty  {
 print("Insert a Destination")
 return
 } else if let text = rp_time.text, text.isEmpty  {
 print("Insert a Time")
 return
 } else {
 let appDelegate = UIApplication.shared.delegate as! AppDelegate
 let loc:String = self.rp_location.text!
 let des:String = self.rp_destination.text!
 let time:String = self.rp_time.text!
 let mon:Bool = self.monday
 let tue:Bool = self.tuesday
 let wed:Bool = self.wednesday
 let thu:Bool = self.thursday
 let fri:Bool = self.friday
 let sat:Bool = self.saturday
 let sun:Bool = self.sunday
 //let session = URLSession.shared
 let dict = ["rider_email":appDelegate.user_email, "rider_departure":loc, "rider_destination":des,
 "rider_timeofdeparture":time, "monday":mon, "tuesday":tue, "wednesday":wed,
 "thursday":thu, "friday":fri, "saturday":sat, "sunday":sun] as [String: Any]
 print(dict)
 if let jsonData = try? JSONSerialization.data(withJSONObject: dict, options: .prettyPrinted) {
 
 print("success")
 let url = NSURL(string: "http://138.68.252.198:8000/rideshare/new_proposed_trip/")!
 let request = NSMutableURLRequest(url: url as URL)
 request.httpMethod = "POST"
 request.addValue("application/json", forHTTPHeaderField: "Content-Type")
 request.httpBody = jsonData
 
 
 let task = URLSession.shared.dataTask(with: request as URLRequest) { data, response, error in
 if let httpResponse = response as? HTTPURLResponse {
 print(httpResponse.statusCode)
 if(httpResponse.statusCode != 201) {
 print("error")
 return
 }
 }
 guard error == nil else {
 print(error!)
 return
 }
 guard let data = data else {
 print("Data is empty")
 return
 }
 let json = try! JSONSerialization.jsonObject(with: data, options: []) as AnyObject
 print(json)
 DispatchQueue.main.async(execute: self.submitDone)
 //let storyBoard: UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
 //let newViewController = storyBoard.instantiateViewController(withIdentifier: "MenuViewController") as! MenuViewController
 //self.present(newViewController, animated: true, completion: nil)
 }
 
 task.resume()
 
 
 }
 
 }
 
 
 }
 
 func submitDone() {
 rp_time.isEnabled = false
 rp_destination.isEnabled = false
 rp_location.isEnabled = false
 rideSelect.isEnabled = true
 submit_button.isEnabled = false
 
 monday_button.isEnabled  = false
 tuesday_button.isEnabled  = false
 wednesday_button.isEnabled  = false
 thursday_button.isEnabled  = false
 friday_button.isEnabled  = false
 saturday_button.isEnabled  = false
 sunday_button.isEnabled  = false
 
 let appDelegate = UIApplication.shared.delegate as! AppDelegate
 while !appDelegate.rider_dayChecker.isEmpty {
 appDelegate.rider_dayChecker.remove(at: 0)
 }
 appDelegate.rider_dayChecker.append(self.monday)
 appDelegate.rider_dayChecker.append(self.tuesday)
 appDelegate.rider_dayChecker.append(self.wednesday)
 appDelegate.rider_dayChecker.append(self.thursday)
 appDelegate.rider_dayChecker.append(self.friday)
 appDelegate.rider_dayChecker.append(self.saturday)
 appDelegate.rider_dayChecker.append(self.sunday)
 print(appDelegate.rider_dayChecker)
 
 submit_button.setTitle("Submitted", for: .normal)
 }
 
 
 override func viewDidAppear(_ animated: Bool) {
 super.viewDidAppear(animated)
 self.navigationController?.isNavigationBarHidden = false
 }
 
 override func viewWillDisappear(_ animated: Bool) {
 super.viewWillDisappear(animated)
 self.navigationController?.isNavigationBarHidden = true
 }
 }*/
