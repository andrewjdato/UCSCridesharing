//
//  AccountInformationViewController.swift
//  Slug Ride 2
//
//  Created by Andrew Dato 
//  Copyright © 2017 Andrew Dat0. All rights reserved.
//

import Foundation
import UIKit

class AccountInformationViewController : UITableViewController{
    
    @IBOutlet weak var first_name: UILabel!
    @IBOutlet weak var last_name: UILabel!
    @IBOutlet weak var email: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.navigationController?.isNavigationBarHidden = true
        
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        self.email.text = appDelegate.user_email
        self.last_name.text = appDelegate.user_lastname
        self.first_name.text = appDelegate.user_firstname
        
    }


    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        self.navigationController?.isNavigationBarHidden = true
    }
}
