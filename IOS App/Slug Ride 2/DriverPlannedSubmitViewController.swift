//
//  DriverPlannedSubmitViewController.swift
//  Slug Ride 2
//
//  Created by Andrew Dato 
//  Copyright © 2017 Andrew Dat0. All rights reserved.
//

import Foundation
import UIKit

class DriverPlannedSubmitViewController : UIViewController{
    
    
    @IBOutlet weak var dp_location: UITextField!
    @IBOutlet weak var dp_destination: UITextField!
    @IBOutlet weak var dp_time: UITextField!
    override func viewDidLoad() {
        super.viewDidLoad()
        self.navigationController?.isNavigationBarHidden = false
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
