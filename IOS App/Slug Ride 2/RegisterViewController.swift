//
//  RegisterViewController.swift
//  Slug Ride 2
//
//  Created by Andrew Dato 
//  Copyright © 2017 Andrew Dat0. All rights reserved.
//

import Foundation
import UIKit

class RegisterViewController : UIViewController{
    let login_url = "http://localhost:8000/rideshare/user_registration/"
    
    @IBOutlet weak var email_register: UITextField!
    @IBOutlet weak var firstname_register: UITextField!
    @IBOutlet weak var lastname_register: UITextField!
    @IBOutlet weak var password_register: UITextField!
    @IBOutlet weak var submit_register: UIButton!
    @IBOutlet weak var password_verify: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.navigationController?.isNavigationBarHidden = false
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        self.navigationController?.isNavigationBarHidden = true
    }
    
    @IBAction func SubmitButton(_ sender: Any) {
        if let text = email_register.text, !text.isEmpty {
            if let text1 = firstname_register.text, !text1.isEmpty {
                if let text2 = lastname_register.text, !text2.isEmpty {
                    if let text3 = password_register.text, !text3.isEmpty {
                        if let text4 = password_verify.text, !text4.isEmpty{
                            if (password_verify.text == password_register.text) {
                                register_now(email:email_register.text!, password: password_register.text!, firstname: firstname_register.text!, lastname:  lastname_register.text!)
                            }
                        }
                    }
                }
            }
        }
    }
    
    func register_now(email:String, password:String, firstname:String, lastname:String)
    {
        let dict = ["first_name":firstname, "last_name":lastname, "email":email, "password":password] as [String: Any]
        if let jsonData = try? JSONSerialization.data(withJSONObject: dict, options: .prettyPrinted) {
            let url = NSURL(string: "http://138.68.252.198:8000/rideshare/user_registration/")!
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
                DispatchQueue.main.async(execute: self.RegisterDone)

            }
            
            task.resume()
            
        }
    }
    
    func RegisterDone()
    {
        email_register.isEnabled = false
        password_register.isEnabled = false
        firstname_register.isEnabled = false
        lastname_register.isEnabled = false
        password_verify.isEnabled = false
        
        submit_register.isEnabled = false
        
        
        submit_register.setTitle("Registered!", for: .normal)
    }
}
