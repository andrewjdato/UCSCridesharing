//
//  DriverViewController.swift
//  Slug Ride 2
//
//  Created by Braulio De La Torre on 5/22/17.
//  Copyright © 2017 Andrew Dat0. All rights reserved.
//
//Driver Main Menu Page

import UIKit
import AVFoundation

class DriverViewController: UIViewController {
    
    //Variables used for the AV functionality
    var avPlayer: AVPlayer!
    var avPlayerLayer: AVPlayerLayer!
    var paused: Bool = false

    @IBOutlet weak var name: UILabel!
    @IBOutlet weak var coins: UILabel!
    //Link to the video view of the object
    @IBOutlet weak var videoView: UIView!
    
    //Basic function that runs when the page first loads up
    override func viewDidLoad() {
        super.viewDidLoad()      
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        self.name.text = appDelegate.user_firstname + " " + appDelegate.user_lastname
        self.coins.text = "\(appDelegate.point_count)"
        //Insert the video for the background
        if let theURL: NSURL = Bundle.main.url(forResource: "drivervidfin", withExtension: "mp4")! as NSURL{
            avPlayer = AVPlayer(url: theURL as URL)
            
        }
        
        
        
        
        //AV player settings
        avPlayerLayer = AVPlayerLayer(player: avPlayer)
        avPlayerLayer.videoGravity = AVLayerVideoGravityResizeAspectFill
        
        avPlayer.volume = 0
        avPlayer.actionAtItemEnd = .none
        
        
        avPlayerLayer.frame = self.videoView.bounds
        
        self.videoView.backgroundColor = .clear
        self.videoView.layer.insertSublayer(avPlayerLayer, at: 0)
        //view.layer.insertSublayer(avPlayerLayer, at: 0)
        
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(playerItemDidReachEnd(notification:)),
                                               name: NSNotification.Name.AVPlayerItemDidPlayToEndTime,
                                               object: avPlayer.currentItem)
        
        //Hide the Navi Bar
        self.navigationController?.isNavigationBarHidden = true
        self.tabBarController?.tabBar.isHidden = true
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    //Repeat the video at the end
    func playerItemDidReachEnd(notification: Notification) {
        let p: AVPlayerItem = notification.object as! AVPlayerItem
        p.seek(to: kCMTimeZero)
    }
    
    //Function for when it loads up the second time
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        self.navigationController?.isNavigationBarHidden = true
        self.tabBarController?.tabBar.isHidden = true
        avPlayer.play()
        paused = false
    }
    
    //Function for when you leave the page
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        avPlayer.pause()
        paused = true
    }
    
    //Status bar color
    override var preferredStatusBarStyle: UIStatusBarStyle {
        return .lightContent
    }
    
    //Move to another page
    @IBAction func CoinMove(_ sender: Any) {
        let newViewController = MarketViewController()
        self.navigationController?.pushViewController(newViewController, animated: true)
    }
    
    @IBAction func DriverMove(_ sender: Any) {
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        appDelegate.driver_status = true;
    }
    
    @IBAction func RiderMover(_ sender: Any) {
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        appDelegate.driver_status = false;
    }
    
    
}
