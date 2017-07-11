//
//  RiderOnDemandSubmitViewController.swift
//  Slug Ride 2
//
//  Created by Andrew Dato 
//  Copyright © 2017 Andrew Dat0. All rights reserved.
//
//
//  RiderOnDemandSubmitViewController.swift
//  Slug Ride 2
//
//  Created by Andrew Dato
//  Copyright © 2017 Andrew Dat0. All rights reserved.
//

import Foundation
import UIKit
import GoogleMaps
import GooglePlaces
import SwiftyJSON
import Alamofire



class RiderOnDemandSubmitViewController : UIViewController , GMSMapViewDelegate ,  CLLocationManagerDelegate {
    
    @IBOutlet weak var googleMaps: GMSMapView!
    @IBOutlet weak var startLocation: UITextField!
    @IBOutlet weak var destinationLocation: UITextField!
    
    @IBOutlet weak var postButton: UIButton!
    @IBOutlet weak var wptLocation: UITextField!
    
   

    
    
    

    
    var timer = Timer()
    
    
    
    var locationManager = CLLocationManager()
    var locationSelected = Location.startLocation
    
    var arrJson:AnyObject?
    
    
    //var for current user data
    var curLocation = CLLocation()
    var locationStart = CLLocation()
    var locationEnd = CLLocation()
    var locationWaypoint = CLLocation()
    var isthereaWpt = false;
    
    
    //var for driver info from server
    var driverEmail: String!
    var driverdepart_lat: Double!
    var driverdepart_lon: Double!
    var driverdest_lat: Double!
    var driverdest_lon: Double!
    
    
    //vars for reverse geolocation
    var revLoc: String!
    var revLoc2: String!
    
    
    //var for driver received data
    var driverLocationStart = CLLocation()
    var driverLocationEnd = CLLocation()
    
    
    
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        self.navigationController?.isNavigationBarHidden = false
    }
    
    
    
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        self.navigationController?.isNavigationBarHidden = true
    }
    
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.postButton.isHidden = true
        self.postButton.layer.borderWidth = 5
        
        locationManager = CLLocationManager()
        locationManager.delegate = self
        locationManager.requestWhenInUseAuthorization()
        locationManager.startUpdatingLocation()
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
        locationManager.startMonitoringSignificantLocationChanges()
        
    
        //Your map initiation code
        let camera = GMSCameraPosition.camera(withLatitude: -7.9293122, longitude: 112.5879156, zoom: 15.0)
        
        self.googleMaps.camera = camera
        self.googleMaps.delegate = self
        self.googleMaps?.isMyLocationEnabled = true
        self.googleMaps.settings.myLocationButton = true
        self.googleMaps.settings.compassButton = true
        self.googleMaps.settings.zoomGestures = true
        
        
        
    }
    
    // MARK: function for create a marker pin on map
    func createMarker(titleMarker: String, iconMarker: UIImage, latitude: CLLocationDegrees, longitude: CLLocationDegrees) {
        let marker = GMSMarker()
        marker.position = CLLocationCoordinate2DMake(latitude, longitude)
        marker.title = titleMarker
        marker.icon = iconMarker
        marker.map = googleMaps
    }
    
    //MARK: - Location Manager delegates
    
    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        print("Error to get location : \(error)")
    }
    
    
    
    
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        
        let location = locations.last
        
        
        //gets the current location and puts it into a global variable to be used in other functions
        self.curLocation = location!
        
        let camera = GMSCameraPosition.camera(withLatitude: (location?.coordinate.latitude)!, longitude: (location?.coordinate.longitude)!, zoom: 17.0)
        
        self.googleMaps?.animate(to: camera)
        self.locationManager.stopUpdatingLocation()
        
    }
    
    
    
    
    
    
    // MARK: - GMSMapViewDelegate
    
    func mapView(_ mapView: GMSMapView, idleAt position: GMSCameraPosition) {
        googleMaps.isMyLocationEnabled = true
    }
    
    
    
    
    
    func mapView(_ mapView: GMSMapView, willMove gesture: Bool) {
        googleMaps.isMyLocationEnabled = true
        
        if (gesture) {
            mapView.selectedMarker = nil
        }
    }
    
    
    
    
    func mapView(_ mapView: GMSMapView, didTap marker: GMSMarker) -> Bool {
        googleMaps.isMyLocationEnabled = true
        return false
    }
    
    
    
    
    func mapView(_ mapView: GMSMapView, didTapAt coordinate: CLLocationCoordinate2D) {
        print("COORDINATE \(coordinate)") // when you tapped coordinate
        
        //clear the marker from before
        self.googleMaps.clear()
        
        //set the coordinate to the start point
        self.locationStart = CLLocation(latitude: coordinate.latitude, longitude: coordinate.longitude)
        
            
        createMarker(titleMarker: "Departure", iconMarker: #imageLiteral(resourceName: "drivericon3"), latitude: coordinate.latitude, longitude: coordinate.longitude)
    }
    
    
    
    func didTapMyLocationButton(for mapView: GMSMapView) -> Bool {
        googleMaps.isMyLocationEnabled = true
        googleMaps.selectedMarker = nil
        return false
    }
    
    
    
    //MARK: - this is function for create direction path, from start location to desination location
    
    func drawPath(startLocation: CLLocation, endLocation: CLLocation, waypoints: CLLocation)
    {
        
        
        
        //Uses current location as the first point in route instead of using input location
        //let origin = "\(curLocation.coordinate.latitude),\(curLocation.coordinate.longitude)"
        
        let origin = "\(startLocation.coordinate.latitude),\(startLocation.coordinate.longitude)"
        let destination = "\(endLocation.coordinate.latitude),\(endLocation.coordinate.longitude)"
        //let wpt = "\(waypoints.coordinate.latitude),\(waypoints.coordinate.longitude)"
        
        //url request with waypoints
        //        let url = "https://maps.googleapis.com/maps/api/directions/json?origin=\(origin)&destination=\(destination)&waypoints=\(wpt)&mode=driving"
        
        let url = "https://maps.googleapis.com/maps/api/directions/json?origin=\(origin)&destination=\(destination)&mode=driving"
        
        Alamofire.request(url).responseJSON { response in
            
            print(response.request as Any)  // original URL request
            print(response.response as Any) // HTTP URL response
            print(response.data as Any)     // server data
            print(response.result as Any)   // result of response serialization
            
            let json = JSON(data: response.data!)
            let routes = json["routes"].arrayValue
            
            print(" JSON is:")
            print(json)
            
//            let jsonRoutes = json["routes"]
//            print("*****-------------jsonRoutes----------------*****")
//            print(jsonRoutes)
//            
//            var duration = jsonRoutes.arrayObject as! [[String: Any]]
//            print("*****-------------DURATION----------------*****")
//            print(duration)
            
//            let one = json.dictionaryObject
//            print("*****-------------dictionary Object----------------*****")
//            print(one)
            
            var two = json.dictionaryValue
            print("*****-------------dictionary value----------------*****")
            print(two)
            
            let three = two
            print("*****-------------count of Dict Value----------------*****")
            print(three)
//            let three = json.dictionary
//            print("*****-------------dictionary----------------*****")
//            print(three)
//            
//            let four = json.arrayValue
//            print("*****-------------array Value----------------*****")
//            print(four)
            
            // print route using Polyline
            for route in routes
            {
                let routeOverviewPolyline = route["overview_polyline"].dictionary
                let points = routeOverviewPolyline?["points"]?.stringValue
                let path = GMSPath.init(fromEncodedPath: points!)
                let polyline = GMSPolyline.init(path: path)
                
            
                
                var routeLegs = route["legs"].arrayValue
                
                
                //print("Route Legs")
                //print(routeLegs)
                
                
                
                
                
                //print("Apple API Distance:")
                //print(startLocation.distance(from: endLocation)/1609.34)
                
                //Google Maps distance is accurate based on route
                print("Google Maps Distance:")
                var variablex = (GMSGeometryLength(path!)/1609.34)
               
                print(variablex)
                
                //self.routeDistance.text  = "\(GMSGeometryLength(path!)/1609.34)"
             
                
                
                //"\((GMSGeometryLength(path!)/1609.34))"
                
                
                
                polyline.strokeWidth = 4
                polyline.strokeColor = UIColor.black
                polyline.map = self.googleMaps
                
                
                //this code sets the camera of Google Maps to view the entire route
                let x: UInt!
                x = 1
                
                var bounds = GMSCoordinateBounds()
                for index in x...(path?.count())!{
                    bounds = bounds.includingCoordinate((path?.coordinate(at: index))!)
                    
                }
                self.googleMaps.animate(with: GMSCameraUpdate.fit(bounds))
                
                // CODE TO CHANGE ALERT AFTER GETTING ROUTE
                let alert = UIAlertController(title: "Route", message: "Looking for Drivers...  Route is \(variablex.truncate(places: 2)) miles long ", preferredStyle: UIAlertControllerStyle.actionSheet)
                
                self.present(alert, animated: true, completion: nil)
                alert.addAction(UIAlertAction(title: "Press Post Ride to begin", style: UIAlertActionStyle.default, handler: {action in
                    print("Done")
                }))
                
            }
            
            
            
        }
    }
    
    
    
    
    // NOT NEEDED ANYMORE
    @IBAction func openStartLocation(_ sender: UIButton) {
        
        let autoCompleteController = GMSAutocompleteViewController()
        autoCompleteController.delegate = self
        
        // selected location
        locationSelected = .startLocation
        
        // Change text color
        UISearchBar.appearance().setTextColor(color: UIColor.black)
        self.locationManager.stopUpdatingLocation()
        
        
       
        self.present(autoCompleteController, animated: true, completion: nil)
    }
    
    // MARK: when destination location tap, this will open the search location
    @IBAction func openDestinationLocation(_ sender: UIButton) {
        
        let autoCompleteController = GMSAutocompleteViewController()
        autoCompleteController.delegate = self
        
        // selected location
        locationSelected = .destinationLocation
        
        // Change text color
        UISearchBar.appearance().setTextColor(color: UIColor.black)
        self.locationManager.stopUpdatingLocation()
        
        self.present(autoCompleteController, animated: true, completion: nil)
    }
    
    
    
    //preConditions: Rider must have a destination and origin set!
    //Rider posts their ride
    //Function leads to Rider continously polling for
    @IBAction func riderPostRide(_ sender: Any) {
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        
        let dict = ["rider_email":appDelegate.user_email,"rider_departure_lat": locationStart.coordinate.latitude ,"rider_departure_lon":locationStart.coordinate.longitude,"rider_destination_lat": locationEnd.coordinate.latitude ,"rider_destination_lon":locationEnd.coordinate.longitude] as [String: Any]
        
        print("*****-------Rider's Ride Object being Posted-------****")
        print(dict)
        
        if let jsonData = try? JSONSerialization.data(withJSONObject: dict, options: .prettyPrinted){
            print("success")
            //SUBJECT TO URL CHANGE!!!!!
            let url = NSURL(string: "http://138.68.252.198:8000/rideshare/rider_ondemand/")!
            let request = NSMutableURLRequest(url: url as URL)
            request.httpMethod = "POST"
            request.addValue("application/json", forHTTPHeaderField: "Content-Type")
            request.httpBody = jsonData
            
            let task = URLSession.shared.dataTask(with: request as URLRequest){
                data, response, error in
                if let httpResponse = response as? HTTPURLResponse{
                    print(httpResponse.statusCode)
                    if(httpResponse.statusCode != 201){
                        print("error")
                        return
                    }
                }
                
                guard error == nil else{
                    print(error!)
                    return
                }
                guard let data = data else{
                    print("data is empty")
                    return
                }
                let json = try! JSONSerialization.jsonObject(with: data, options: []) as AnyObject
                print(json)
                
            }
            self.timer = Timer.scheduledTimer(timeInterval: 5, target: self, selector: #selector(self.pollforDrivers(_:)), userInfo: nil, repeats: true)
            task.resume()
            
            
            
        }
        
        
    }
    
    
    func test(_ sender: Any){
        let alert = UIAlertController(title: "Driver Found", message: "Request driver john@ucsc.edu or reject to keep searching ", preferredStyle: UIAlertControllerStyle.alert)
        alert.addAction(UIAlertAction(title: "Request", style: UIAlertActionStyle.default, handler: {action in
            self.requestDriver()
        }))
        alert.addAction(UIAlertAction(title:"Reject",style: UIAlertActionStyle.default, handler: {action in
            // self.timer = Timer.scheduledTimer(timeInterval: 5, target: self, selector: #selector(self.pollforDrivers(_:)), userInfo: nil, repeats: true)
            
        }))
        self.present(alert, animated: true, completion: nil)
        
    
    }
    
    
    //function that receives driver data once ride has been posted
    func pollforDrivers(_ sender: Any){
        print("Server Poll Rider Side")
        let url = NSURL(string: "http://138.68.252.198:8000/rideshare/rider_getdrivers_ondemand/")!
        let request = NSMutableURLRequest(url: url as URL)
        request.httpMethod = "GET"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        
        
        
        let task = URLSession.shared.dataTask(with: request as URLRequest) { data, response, error in
            if let httpResponse = response as? HTTPURLResponse {
                print(httpResponse.statusCode)
                if(httpResponse.statusCode != 200) {
                    print("Status Code Not Okay")
                    
                    
                    
                    
                    return
                }
            }
            guard error == nil else {
                print("no info")
                return
            }
            
            
            //if data is recieved then the data must be decoded into driver email, departure
            //and destination
            //this must be put into var's and rider must be able to request the driver
            guard let data = data else {
                print("Data is empty")
                return
            }
            let json = try! JSONSerialization.jsonObject(with: data, options: []) as AnyObject
            print("******--------Driver Object Returned to Driver------*****")
            print(json)
            let users = json as? [[String: Any]]
            
            
            
            for user in users!{
                if (user["driverod_email"] != nil){
                    
                    self.driverEmail = user["driverod_email"] as! String
                    //print(self.driverEmail)
                }
                if (user["driver_departure_lat"] != nil){
                    
                    self.driverdepart_lat = user["driver_departure_lat"] as! Double
                }
                if (user["driver_departure_lon"] != nil){
                  
                    self.driverdepart_lon = user["driver_departure_lon"] as! Double
                }
                if (user["driver_destination_lat"] != nil){
                    
                    self.driverdest_lat = user["driver_destination_lat"] as! Double
                    print(self.driverdest_lat)
                    print("check2")

                }
                if (user["driver_destination_lon"] != nil){
                    
                    self.driverdest_lon = user["driver_destination_lon"] as! Double
                    
                    print(self.driverdest_lon)
                    print("check2")
                    
                }
                //reverse Geolocation
                
                
                
            
               
             //if statement to check for driver found
                if self.driverdest_lon != nil {
                    
                    
                    //stop polling once a new driver has been found
                    //self.timer.invalidate()
                
                //Alert Handler for when Driver is found
                let alert = UIAlertController(title: "Driver Found", message: "Tap Request to request driver from \(self.revLoc) to \(self.revLoc2) or reject to keep searching ", preferredStyle: UIAlertControllerStyle.alert)
                alert.addAction(UIAlertAction(title: "Request", style: UIAlertActionStyle.default, handler: {action in
                    //self.requestDriver()
                }))
                alert.addAction(UIAlertAction(title:"Reject",style: UIAlertActionStyle.default, handler: {action in
               // self.timer = Timer.scheduledTimer(timeInterval: 5, target: self, selector: #selector(self.pollforDrivers(_:)), userInfo: nil, repeats: true)
                
                }))
                self.present(alert, animated: true, completion: nil)
                
                }
                
            }
            
            
        }
        
        task.resume()
        
    }
    
    
    
    
    
    
    //function for when driver is to be requested by rider
    func requestDriver(){
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        
        //stops timer
        
        self.timer.invalidate()
        self.timer = Timer.scheduledTimer(timeInterval: 5, target: self, selector: #selector(self.requestDriver), userInfo: nil, repeats: true)
        
        
        let dict = ["rider_email":appDelegate.user_email,"driver_email": self.driverEmail,"riderdest_lat": self.locationEnd.coordinate.latitude,"riderdest_lon": self.locationEnd.coordinate.longitude] as [String: Any]
        print(dict)
        
        if let jsonData = try? JSONSerialization.data(withJSONObject: dict, options: .prettyPrinted){
            print("success")
            //SUBJECT TO URL CHANGE!!!!!
            let url = NSURL(string: "http://138.68.252.198:8000/rideshare/rider_request_driver/")!
            let request = NSMutableURLRequest(url: url as URL)
            request.httpMethod = "POST"
            request.addValue("application/json", forHTTPHeaderField: "Content-Type")
            request.httpBody = jsonData
            
            let task = URLSession.shared.dataTask(with: request as URLRequest){
                data, response, error in
                if let httpResponse = response as? HTTPURLResponse{
                    print(httpResponse.statusCode)
                    if(httpResponse.statusCode != 201){
                        print("error")
                        return
                    }
                }
                
                guard error == nil else{
                    print(error!)
                    return
                }
                guard let data = data else{
                    print("data is empty")
                    return
                }
                //let json = try! JSONSerialization.jsonObject(with: data, options: []) as AnyObject
                //print(json)
                
                
                
                
            }
            task.resume()
            
            
            
        }
        
        
        
    }
    
    
    
    // MARK: SHOW DIRECTION WITH BUTTON
    @IBAction func showDirection(_ sender: UIButton) {
        if let text = destinationLocation.text, !text.isEmpty{
                self.postButton.isHidden = false
                
                // when button direction tapped, must call drawpath func
                self.drawPath(startLocation: locationStart, endLocation: locationEnd,waypoints: locationWaypoint)
                
                
                GMSCameraPosition.camera(withLatitude: locationStart.coordinate.latitude, longitude: locationEnd.coordinate.longitude, zoom: 14.0)

        } else {
            let alert = UIAlertController(title: "Submit Error", message: "Please insert a destination", preferredStyle: UIAlertControllerStyle.alert)
            alert.addAction(UIAlertAction(title:"Ok",style: UIAlertActionStyle.default, handler:
                {action in}
            ))
            self.present(alert, animated: true, completion: nil)
        }
        
        
    }
    
}

// MARK: - GMS Auto Complete Delegate, for autocomplete search location
extension RiderOnDemandSubmitViewController: GMSAutocompleteViewControllerDelegate {
    
    func viewController(_ viewController: GMSAutocompleteViewController, didFailAutocompleteWithError error: Error) {
        print("Error \(error)")
    }
    
    func viewController(_ viewController: GMSAutocompleteViewController, didAutocompleteWith place: GMSPlace) {
        
        // Change map location
        let camera = GMSCameraPosition.camera(withLatitude: place.coordinate.latitude, longitude: place.coordinate.longitude, zoom: 16.0
        )
        
        // set coordinate to text
        if locationSelected == .startLocation {
            startLocation.text = place.name
            locationStart = CLLocation(latitude: place.coordinate.latitude, longitude: place.coordinate.longitude)
            createMarker(titleMarker: "Location Start", iconMarker: #imageLiteral(resourceName: "mapspin"), latitude: place.coordinate.latitude, longitude: place.coordinate.longitude)
        } else if locationSelected == .destinationLocation {
            destinationLocation.text = place.name	
            locationEnd = CLLocation(latitude: place.coordinate.latitude, longitude: place.coordinate.longitude)
            createMarker(titleMarker: "Location End", iconMarker: #imageLiteral(resourceName: "drivericon4"), latitude: place.coordinate.latitude, longitude: place.coordinate.longitude)
        } else if locationSelected == .wptLocation{
            wptLocation.text = "\(place.coordinate.latitude), \(place.coordinate.longitude)"
            locationWaypoint = CLLocation(latitude: place.coordinate.latitude, longitude: place.coordinate.longitude)
            createMarker(titleMarker: "Waypoint", iconMarker: #imageLiteral(resourceName: "mapspin"), latitude: place.coordinate.latitude, longitude: place.coordinate.longitude)
        }
        
        
        self.googleMaps.camera = camera
        self.dismiss(animated: true, completion: nil)
        
    }
    
    func wasCancelled(_ viewController: GMSAutocompleteViewController) {
        self.dismiss(animated: true, completion: nil)
    }
    
    func didRequestAutocompletePredictions(_ viewController: GMSAutocompleteViewController) {
        UIApplication.shared.isNetworkActivityIndicatorVisible = true
    }
    
    func didUpdateAutocompletePredictions(_ viewController: GMSAutocompleteViewController) {
        UIApplication.shared.isNetworkActivityIndicatorVisible = false
    }
    
}

public extension UISearchBar {
    
    public func setTextColor(color: UIColor) {
        let svs = subviews.flatMap { $0.subviews }
        guard let tf = (svs.filter { $0 is UITextField }).first as? UITextField else { return }
        tf.textColor = color
    }
    
}
public extension Double
{
    func truncate(places : Int)-> Double
    {
        return Double(floor(pow(10.0, Double(places)) * self)/pow(10.0, Double(places)))
    }
}
