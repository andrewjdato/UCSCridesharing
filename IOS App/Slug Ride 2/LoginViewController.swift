//
//  LoginViewController.swift
//  Slug Ride 2
//
//  Created by Andrew Dato 
//  Copyright © 2017 Andrew Dat0. All rights reserved.
//

import Foundation
import UIKit

class LoginViewController : UIViewController{
    
    
    let login_url = "http://localhost:8000/rideshare/user_login/"
    //let checksession_url = "http://localhost:8000/rideshare/user_login/"
    
    
    var login_session:String = ""
    
    @IBOutlet weak var username_input: UITextField!
    @IBOutlet weak var password_input: UITextField!
    
    @IBOutlet weak var login_button: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.navigationController?.isNavigationBarHidden = false
        
        //username_input.text = "try@me.com"
        //password_input.text = "test"
        
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
        if let jsonData = try? JSONSerialization.data(withJSONObject: dict, options: .prettyPrinted) {
            
            
            let url = NSURL(string: "http://localhost:8000/rideshare/user_login/")!
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
                
                
                let json = try! JSONSerialization.jsonObject(with: data, options: [])
                print(json)
                DispatchQueue.main.async(execute: self.LoginDone)
                let storyBoard: UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
                let newViewController = storyBoard.instantiateViewController(withIdentifier: "MenuViewController") as! MenuViewController
                self.present(newViewController, animated: true, completion: nil)
            }
            
            task.resume()
            
            
        }

    }
    
    
    
    
    /*
    func check_session()
    {
        let post_data: NSDictionary = NSMutableDictionary()
        
        
        post_data.setValue(login_session, forKey: "session")
        
        let url:URL = URL(string: checksession_url)!
        let session = URLSession.shared
        
        let request = NSMutableURLRequest(url: url)
        request.httpMethod = "POST"
        request.cachePolicy = NSURLRequest.CachePolicy.reloadIgnoringCacheData
        
        var paramString = ""
        
        
        for (key, value) in post_data
        {
            paramString = paramString + (key as! String) + "=" + (value as! String) + "&"
        }
        
        request.httpBody = paramString.data(using: String.Encoding.utf8)
        
        let task = session.dataTask(with: request as URLRequest, completionHandler: {
            (
            data, response, error) in
            
            guard let _:Data = data, let _:URLResponse = response  , error == nil else {
                
                return
            }
            
            
            let json: Any?
            
            do
            {
                json = try JSONSerialization.jsonObject(with: data!, options: [])
            }
            catch
            {
                return
            }
            
            guard let server_response = json as? NSDictionary else
            {
                return
            }
            
            if let response_code = server_response["response_code"] as? Int
            {
                if(response_code == 200)
                {
                    DispatchQueue.main.async(execute: self.LoginDone)
                    
                    
                }
                else
                {
                    DispatchQueue.main.async(execute: self.LoginToDo)
                }
            }
            
            
            
        })
        
        task.resume()
        
        
    }
    */
    
    
    
    
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
