//
//  AppleMapsViewController.swift
//  Slug Ride 2
//
//  Created by Braulio De La Torre on 8/5/17.
//  Copyright © 2017 Andrew Dat0. All rights reserved.
//

import UIKit
import MapKit
import CoreLocation


class AppleMapsViewController: UIViewController,CLLocationManagerDelegate {
    
    
    //outlet for Maps
    @IBOutlet weak var mapView: MKMapView!
    
    let manager = CLLocationManager()
    
    
    //function that finds location with precision
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        let location = locations[0]
        
        let span:MKCoordinateSpan = MKCoordinateSpanMake(0.01, 0.01)
        
        let myLocation:CLLocationCoordinate2D = CLLocationCoordinate2DMake(location.coordinate.latitude, location.coordinate.longitude)
        
        let region:MKCoordinateRegion = MKCoordinateRegionMake(myLocation, span)
        
        mapView.setRegion(region, animated: true)
        
        self.mapView.showsUserLocation = true
        
        
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        //finds current location, sets it, and continously updates
        manager.delegate = self
        manager.desiredAccuracy = kCLLocationAccuracyBest
        manager.requestWhenInUseAuthorization()
        manager.startUpdatingLocation()
        
        
        //code to display a certain location on the map
       // mapView.setRegion(MKCoordinateRegionMakeWithDistance(CLLocationCoordinate2DMake(48.83664488641497, 2.320432662963867), 1500, 1500), animated: true)

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
