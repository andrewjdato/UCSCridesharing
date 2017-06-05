//
//  DriverViewController.swift
//  Slug Ride 2
//
//  Created by Braulio De La Torre on 5/22/17.
//  Copyright © 2017 Andrew Dat0. All rights reserved.
//

import UIKit
import AVFoundation

class DriverViewController: UIViewController {
    
    var avPlayer: AVPlayer!
    var avPlayerLayer: AVPlayerLayer!
    var paused: Bool = false
    
    @IBOutlet weak var onDemandButton: UIButton!
    @IBOutlet weak var plannedButton: UIButton!
    @IBOutlet weak var scheduleButton: UIButton!
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.onDemandButton.layer.cornerRadius = 10
        self.onDemandButton.clipsToBounds = true
        
        self.plannedButton.layer.cornerRadius = 10
        self.plannedButton.clipsToBounds = true
        
        self.scheduleButton.layer.cornerRadius = 10
        self.scheduleButton.clipsToBounds = true
        
        if let theURL: NSURL = Bundle.main.url(forResource: "ridervid3", withExtension: "mp4")! as NSURL{
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
        
        
        self.navigationController?.isNavigationBarHidden = true
        // Do any additional setup after loading the view, typically from a nib.
    }
    
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
    
    @IBAction func move(_ sender: Any) {
        let newViewController = DSViewController()
        self.navigationController?.pushViewController(newViewController, animated: true)
    }
    
    
    
    
    
}
