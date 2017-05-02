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
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.navigationController?.isNavigationBarHidden = false
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        self.navigationController?.isNavigationBarHidden = false
        
            print("success")
            let url = NSURL(string: "http://localhost:8000/rideshare/get_all_planned_trips/")!
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
        print("load Success")
    }
    
}
