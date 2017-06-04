//
//  LoginViewController.swift
//  Slug Ride 2
//
//  Created by Andrew Dato 
//  Copyright © 2017 Andrew Dat0. All rights reserved.
//

import Foundation
import UIKit
import AVFoundation


class LoginViewController : UIViewController{
    var avPlayer: AVPlayer!
    var avPlayerLayer: AVPlayerLayer!
    var paused: Bool = false
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func playerItemDidReachEnd(notification: Notification) {
        let p: AVPlayerItem = notification.object as! AVPlayerItem
        p.seek(to: kCMTimeZero)
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        avPlayer.play()
        paused = false
    }
    
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        avPlayer.pause()
        paused = true
    }
    let login_url = "http://localhost:8000/rideshare/user_login/"
    //let checksession_url = "http://localhost:8000/rideshare/user_login/"
    
    
    var login_session:String = ""
    
    var user_email:String = ""
    var user_firstname:String = ""
    var user_lastname:String = ""
    
    @IBOutlet weak var username_input: UITextField!
    @IBOutlet weak var password_input: UITextField!
    
    @IBOutlet weak var login_button: UIButton!

    override func viewDidLoad() {
        super.viewDidLoad()
        
        if let theURL: NSURL = Bundle.main.url(forResource: "ridervid2", withExtension: "mp4")! as NSURL{
            avPlayer = AVPlayer(url: theURL as URL)
            
        }
        
        
        avPlayerLayer = AVPlayerLayer(player: avPlayer)
        avPlayerLayer.videoGravity = AVLayerVideoGravityResizeAspectFill
        avPlayer.volume = 0
        avPlayer.actionAtItemEnd = .none
        
        
        avPlayerLayer.frame = view.layer.bounds
        view.backgroundColor = .clear
        view.layer.insertSublayer(avPlayerLayer, at: 0)
        
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(playerItemDidReachEnd(notification:)),
                                               name: NSNotification.Name.AVPlayerItemDidPlayToEndTime,
                                               object: avPlayer.currentItem)
        
        self.navigationController?.isNavigationBarHidden = false
        
        username_input.text = "od1@ucsc.edu"
        password_input.text = "od1"
        
        /*
        let preferences = UserDefaults.standard
        if preferences.object(forKey: "session") != nil
        {
            login_session = preferences.object(forKey: "session") as! String
            check_session()
        }
        else
        {
            LoginToDo()
        }*/
    }
    
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        self.navigationController?.isNavigationBarHidden = true
    }
    
    

    @IBAction func login_submit(_ sender: Any) {
        if(login_button.titleLabel?.text == "Logout")
        {
            let preferences = UserDefaults.standard
            preferences.removeObject(forKey: "session")
            
            LoginToDo()
        }
        else{
            if let text = username_input.text, !text.isEmpty {
                if let text1 = password_input.text, !text1.isEmpty {
                    login_now(username:username_input.text!, password: password_input.text!)
                }
            }
        }
    }
    
    
    func login_now(username:String, password:String)
    {
        //let session = URLSession.shared
        let dict = ["email":username, "password":password] as [String: Any]
        print(dict)
        if let jsonData = try? JSONSerialization.data(withJSONObject: dict, options: .prettyPrinted) {
            
            print(jsonData)
            let url = NSURL(string: "http://138.68.252.198:8000/rideshare/user_login/")!
            //let url = NSURL(string: "http://localhost:8000/rideshare/user_login/")!
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
                if let userEmail = json["email"] as AnyObject? {
                    guard let b = userEmail as? String
                        else {
                            print("Error") // Was not a string
                            return // needs a return or break here
                    }
                    if b == "" {
                        print("Error") // Was not a string
                        return // needs a return or break here
                    }
                    self.user_email = b
                }
                if let userfirstname = json["first_name"] as AnyObject? {
                    guard let b = userfirstname as? String
                        else {
                            print("Error") // Was not a string
                            return // needs a return or break here
                    }
                    if b == "" {
                        print("Error") // Was not a string
                        return // needs a return or break here
                    }
                    self.user_firstname = b
                }
                if let userfirstname = json["last_name"] as AnyObject? {
                    guard let b = userfirstname as? String
                        else {
                            print("Error") // Was not a string
                            return // needs a return or break here
                    }
                    if b == "" {
                        print("Error") // Was not a string
                        return // needs a return or break here
                    }
                    self.user_lastname = b
                }

                let appDelegate = UIApplication.shared.delegate as! AppDelegate
                appDelegate.user_email = self.user_email
                appDelegate.user_lastname = self.user_lastname
                appDelegate.user_firstname = self.user_firstname


                
                DispatchQueue.main.async(execute: self.LoginDone)
                let storyBoard: UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
                let newViewController = storyBoard.instantiateViewController(withIdentifier: "MenuViewController") as! MenuViewController
                self.present(newViewController, animated: true, completion: nil)
            }
            
            task.resume()
            
            
        }

    }
    
    
    
    
    
    func LoginDone()
    {
        username_input.isEnabled = false
        password_input.isEnabled = false
        
        login_button.isEnabled = true
        
        
        login_button.setTitle("Logout", for: .normal)
    }
    
    func LoginToDo()
    {
        username_input.isEnabled = true
        password_input.isEnabled = true
        
        login_button.isEnabled = true
        
        
        login_button.setTitle("Login", for: .normal)
    }

    
    
}
