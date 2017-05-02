//
//  RiderPlannedSubmitViewController.swift
//  Slug Ride 2
//
//  Created by Andrew Dato 
//  Copyright © 2017 Andrew Dat0. All rights reserved.
//

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
                let url = NSURL(string: "http://localhost:8000/rideshare/new_proposed_trip/")!
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
}
