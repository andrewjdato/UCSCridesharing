//
//  RiderScheduleViewController.swift
//  Slug Ride 2
//
//  Created by Andrew Dato 
//  Copyright © 2017 Andrew Dat0. All rights reserved.
//

import Foundation
import UIKit

class RiderScheduleViewController : UIViewController{
    
    @IBOutlet weak var rp_count: UILabel!
    @IBOutlet weak var rp_max: UILabel!
    @IBOutlet weak var rp_firstname: UILabel!
    @IBOutlet weak var rp_lastname: UILabel!
    
    @IBOutlet weak var rp_location: UILabel!
    @IBOutlet weak var rp_destination: UILabel!
    @IBOutlet weak var rp_time: UILabel!
    @IBOutlet weak var rp_mon: UILabel!
    @IBOutlet weak var rp_tue: UILabel!
    @IBOutlet weak var rp_wed: UILabel!
    @IBOutlet weak var rp_thu: UILabel!
    @IBOutlet weak var rp_fri: UILabel!
    @IBOutlet weak var rp_sat: UILabel!
    @IBOutlet weak var rp_sun: UILabel!

    
    var arrJson:AnyObject?
    var max = 1
    var count = 0

    override func viewDidLoad() {
        super.viewDidLoad()
        self.navigationController?.isNavigationBarHidden = false
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        self.navigationController?.isNavigationBarHidden = false
        
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        let dict = ["email":appDelegate.user_email] as [String: Any]
        print(dict)
        if let jsonData = try? JSONSerialization.data(withJSONObject: dict, options: .prettyPrinted) {
            
            print("success")
            let url = NSURL(string: "http://138.68.252.198:8000/rideshare/get_riders_approved_trips/")!
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
                let json = try! JSONSerialization.jsonObject(with: data, options: []) as AnyObject
                print(json)
                self.arrJson = json
                print(self.arrJson!)
                
                
                let users = self.arrJson as? [[String: Any]]
                for user in users! {
                    print(user)
                    self.max += 1
                }
                print(self.max)
                DispatchQueue.main.async(execute: self.loadDone)
                //let storyBoard: UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
                //let newViewController = storyBoard.instantiateViewController(withIdentifier: "MenuViewController") as! MenuViewController
                //self.present(newViewController, animated: true, completion: nil)
            }
            
            task.resume()
            
        }
        
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        self.navigationController?.isNavigationBarHidden = true

        
        
    }
    
    func loadDone() {
        print("load Success")
        self.count = 0;
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
        var tempCount = 0
        let users = self.arrJson as? [[String: Any]]
        for user in users! {
            if tempCount == count {
                print(user["driver_location"]!)
                rp_firstname.text = user["first_name"] as? String
                rp_lastname.text = user["last_name"] as? String
                rp_location.text = user["driver_location"] as? String
                rp_destination.text = user["driver_destination"] as? String
                rp_time.text = user["driver_timeofdeparture"] as? String
                if user["monday"] as? Bool == false {
                    rp_mon.text = "Mon"
                } else {
                    rp_mon.text = "Mon X"
                }
                if user["tuesday"] as? Bool == false {
                    rp_tue.text = "Tue"
                } else {
                    rp_tue.text = "Tue X"
                }
                if user["wednesday"] as? Bool == false {
                    rp_wed.text = "Wed"
                } else {
                    rp_wed.text = "Wed X"
                }
                if user["thursday"] as? Bool == false {
                    rp_thu.text = "Thu"
                } else {
                    rp_thu.text = "Thu X"
                }
                if user["friday"] as? Bool == false {
                    rp_fri.text = "Fri"
                } else {
                    rp_fri.text = "Fri X"
                }
                if user["saturday"] as? Bool == false {
                    rp_sat.text = "Sat"
                } else {
                    rp_sat.text = "Sat X"
                }
                if user["sunday"] as? Bool == false {
                    rp_sun.text = "Sun"
                } else {
                    rp_sun.text = "Sun X"
                }
                break
            }
            tempCount+=1
        }
        rp_max.text = "\(self.max-1)"
        rp_count.text = "\(self.count+1)"
    }

}
