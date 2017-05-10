//
//  DriverPlannedSubmitViewController.swift
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

class DriverPlannedSubmitViewController : UIViewController, GMSMapViewDelegate ,  CLLocationManagerDelegate{
    

    @IBOutlet weak var startloc_label: UILabel!
    @IBOutlet weak var destLoc_label: UILabel!
    @IBOutlet weak var startloc_button: UIButton!
    @IBOutlet weak var destloc_button: UIButton!
    @IBOutlet weak var submit_button: UIButton!
    
    @IBOutlet weak var dp_location: UITextField!
    @IBOutlet weak var dp_destination: UITextField!
    @IBOutlet weak var dp_time: UITextField!
  
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
    
    var locationManager = CLLocationManager()
    var locationSelected = Location.startLocation
    
    
    
    override func viewDidLoad() {

        super.viewDidLoad()
        self.navigationController?.isNavigationBarHidden = false
        monday_label.text = "Mon   "
        tueday_label.text = "Tue   "
        wednesday_label.text = "Wed   "
        thursday_label.text = "Thu   "
        friday_label.text = "Fri   "
        saturday_label.text = "Sat   "
        sunday_label.text = "Sun   "
        
        locationManager = CLLocationManager()
        locationManager.delegate = self
        locationManager.requestWhenInUseAuthorization()
        locationManager.startUpdatingLocation()
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
        locationManager.startMonitoringSignificantLocationChanges()
        
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
        } else if let text = dp_location.text, text.isEmpty  {
            print("Insert a Location")
            return
        } else if let text = dp_destination.text, text.isEmpty  {
            print("Insert a Destination")
            return
        } else if let text = dp_time.text, text.isEmpty  {
            print("Insert a Time")
            return
        } else {
            let appDelegate = UIApplication.shared.delegate as! AppDelegate
            let loc:String = self.dp_location.text!
            let des:String = self.dp_destination.text!
            let time:String = self.dp_time.text!
            let mon:Bool = self.monday
            let tue:Bool = self.tuesday
            let wed:Bool = self.wednesday
            let thu:Bool = self.thursday
            let fri:Bool = self.friday
            let sat:Bool = self.saturday
            let sun:Bool = self.sunday
            //let session = URLSession.shared
            let dict = ["driver_email":appDelegate.user_email, "driver_departure":loc, "driver_destination":des,
                        "driver_timeofdeparture":time, "monday":mon, "tuesday":tue, "wednesday":wed,
                        "thursday":thu, "friday":fri, "saturday":sat, "sunday":sun] as [String: Any]
            print(dict)
            if let jsonData = try? JSONSerialization.data(withJSONObject: dict, options: .prettyPrinted) {
                
                print("success")
                let url = NSURL(string: "http://138.68.252.198:8000/rideshare/new_planned_trip/")!
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
    
    func submitDone()
    {
        dp_time.isEnabled = false
        dp_destination.isEnabled = false
        dp_location.isEnabled = false
        
        submit_button.isEnabled = false
        
        monday_button.isEnabled  = false
        tuesday_button.isEnabled  = false
        wednesday_button.isEnabled  = false
        thursday_button.isEnabled  = false
        friday_button.isEnabled  = false
        saturday_button.isEnabled  = false
        sunday_button.isEnabled  = false
        
        
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
extension DriverPlannedSubmitViewController : GMSAutocompleteViewControllerDelegate {
    
    func viewController(_ viewController: GMSAutocompleteViewController, didFailAutocompleteWithError error: Error) {
        print("Error \(error)")
    }
    
    func viewController(_ viewController: GMSAutocompleteViewController, didAutocompleteWith place: GMSPlace) {
        
        // Change map location
        //let camera = GMSCameraPosition.camera(withLatitude: place.coordinate.latitude, longitude: place.coordinate.longitude, zoom: 16.0
        //)
        
        // set coordinate to text
        if locationSelected == .startLocation {
            destLoc_label.text = place.name
            //locationStart = CLLocation(latitude: place.coordinate.latitude, longitude: place.coordinate.longitude)
            //createMarker(titleMarker: "Location Start", iconMarker: #imageLiteral(resourceName: "mapspin"), latitude: place.coordinate.latitude, longitude: place.coordinate.longitude)
        } else if locationSelected == .destinationLocation {
            startloc_label.text = place.name
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



