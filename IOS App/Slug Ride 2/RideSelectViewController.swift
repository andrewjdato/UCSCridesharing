//
//  RideSelectViewController.swift
//  Slug Ride 2
//
//  Created by Andrew dato on 5/2/17.
//  Copyright © 2017 Andrew Dat0. All rights reserved.
//

import Foundation
import UIKit

class RideSelectViewController : UIViewController{
    
    @IBOutlet weak var join_label: UILabel!
    
    @IBOutlet weak var rs_count: UILabel!
    @IBOutlet weak var rs_max: UILabel!
    @IBOutlet weak var rs_firstname: UILabel!
    @IBOutlet weak var rs_lastname: UILabel!
    
    @IBOutlet weak var rs_location: UILabel!
    @IBOutlet weak var rs_destination: UILabel!
    @IBOutlet weak var rs_time: UILabel!
    @IBOutlet weak var rs_mon: UILabel!
    @IBOutlet weak var rs_tue: UILabel!
    @IBOutlet weak var rs_wed: UILabel!
    @IBOutlet weak var rs_thu: UILabel!
    @IBOutlet weak var rs_fri: UILabel!
    @IBOutlet weak var rs_sat: UILabel!
    @IBOutlet weak var rs_sun: UILabel!
    
    @IBOutlet weak var join_button: UIButton!
    
    var arrJson:AnyObject?
    var max = 1
    var count = 0
    var matching_id = [Int]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.navigationController?.isNavigationBarHidden = false
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        self.navigationController?.isNavigationBarHidden = false
        join_button.isEnabled = false
        print("success")
        let url = NSURL(string: "http://138.68.252.198:8000/rideshare/get_all_planned_trips/")!
        let request = NSMutableURLRequest(url: url as URL)
        request.httpMethod = "GET"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        
        
        
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
            self.arrJson = json
            print(self.arrJson!)
            
            
            
            let users = self.arrJson as? [[String: Any]]
            let appDelegate = UIApplication.shared.delegate as! AppDelegate
            for user in users! {
                print(user)
                if (appDelegate.rider_dayChecker[0] == user["monday"] as? Bool && appDelegate.rider_dayChecker[0] == true) ||
                (appDelegate.rider_dayChecker[1] == user["tuesday"] as? Bool && appDelegate.rider_dayChecker[1] == true) ||
                (appDelegate.rider_dayChecker[2] == user["wednesday"] as? Bool && appDelegate.rider_dayChecker[2] == true) ||
                (appDelegate.rider_dayChecker[3] == user["thursday"] as? Bool && appDelegate.rider_dayChecker[3] == true) ||
                (appDelegate.rider_dayChecker[4] == user["friday"] as? Bool && appDelegate.rider_dayChecker[4] == true) ||
                (appDelegate.rider_dayChecker[5] == user["saturday"] as? Bool && appDelegate.rider_dayChecker[5] == true) ||
                (appDelegate.rider_dayChecker[6] == user["sunday"] as? Bool && appDelegate.rider_dayChecker[6] == true) {
                    self.matching_id.append(user["trip_id"] as! Int)
                    self.max += 1
                }
            }
            print(self.matching_id)
            print(self.max)
            DispatchQueue.main.async(execute: self.loadDone)
            
            
            //let storyBoard: UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
            //let newViewController = storyBoard.instantiateViewController(withIdentifier: "MenuViewController") as! MenuViewController
            //self.present(newViewController, animated: true, completion: nil)
        }
        
        task.resume()
        
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        self.navigationController?.isNavigationBarHidden = true
    }
    
    
    func loadDone() {
        self.count = 0
        print("load Success")
        displayData()
    }
    
    @IBAction func SwipeLeft(_ sender: UISwipeGestureRecognizer) {
        print("swipe left")
        if self.count+1 < max-1 {
            self.count += 1
            displayData()
        }
    }
    @IBAction func SwipeRight(_ sender: UISwipeGestureRecognizer) {
        print("swipe right")
        if count > 0 {
            self.count -= 1
            displayData()
        }
    }
    
    func displayData() {
        let users = self.arrJson as? [[String: Any]]
        for user in users! {
            if self.matching_id[self.count]  == user["trip_id"] as! Int {
                join_label.text = "Join"
                join_button.isEnabled = true
                print(user["driver_departure"]!)
                rs_firstname.text = user["first_name"] as? String
                rs_lastname.text = user["last_name"] as? String
                rs_location.text = user["driver_departure"] as? String
                rs_destination.text = user["driver_destination"] as? String
                rs_time.text = user["driver_timeofdeparture"] as? String
                if user["monday"] as? Bool == false {
                    rs_mon.text = "Mon"
                } else {
                    rs_mon.text = "Mon X"
                }
                if user["tuesday"] as? Bool == false {
                    rs_tue.text = "Tue"
                } else {
                    rs_tue.text = "Tue X"
                }
                if user["wednesday"] as? Bool == false {
                    rs_wed.text = "Wed"
                } else {
                    rs_wed.text = "Wed X"
                }
                if user["thursday"] as? Bool == false {
                    rs_thu.text = "Thu"
                } else {
                    rs_thu.text = "Thu X"
                }
                if user["friday"] as? Bool == false {
                    rs_fri.text = "Fri"
                } else {
                    rs_fri.text = "Fri X"
                }
                if user["saturday"] as? Bool == false {
                    rs_sat.text = "Sat"
                } else {
                    rs_sat.text = "Sat X"
                }
                if user["sunday"] as? Bool == false {
                    rs_sun.text = "Sun"
                } else {
                    rs_sun.text = "Sun X"
                }
                break
            }
        }
        rs_max.text = "\(self.max-1)"
        rs_count.text = "\(self.count+1)"
    }
    
    @IBAction func join_press(_ sender: Any) {
        
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        let dict = ["email":appDelegate.user_email, "trip_id":self.matching_id[count]] as [String: Any]
        print(dict)
        if let jsonData = try? JSONSerialization.data(withJSONObject: dict, options: .prettyPrinted) {
            
            print("success")
            let url = NSURL(string: "http://138.68.252.198:8000/rideshare/ride_join_trip/")!
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
                DispatchQueue.main.async(execute: self.joinDone)
                //let storyBoard: UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
                //let newViewController = storyBoard.instantiateViewController(withIdentifier: "MenuViewController") as! MenuViewController
                //self.present(newViewController, animated: true, completion: nil)
            }
            task.resume()
        }
    }
    
    func joinDone() {
        join_label.text = "Joined"
        join_button.isEnabled = false
        print("Joined!")
    }
}
