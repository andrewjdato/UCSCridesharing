//
//  TestController.swift
//  Slug Ride 2
//
//  Created by Andrew dato on 5/23/17.
//  Copyright © 2017 Andrew Dat0. All rights reserved.
//

import LBTAComponents
import Foundation

struct RiderDSD {
    let rider_email : String;
    let rider_firstname : String;
    let rider_lastname : String;
    let rider_departure_longitude: Double;
    let rider_departure_latitude: Double;
    let rider_destination_longitude: Double;
    let rider_destination_latitude: Double;
    let rider_timeofdeparture_hour: Int;
    let rider_timeofdeparture_minute: Int
    let rider_approved : Bool;
}

class DSDFooter: DatasourceCell {
    override func setupViews() {
        super.setupViews()
        backgroundColor = .red
    }
}

class DSDHeader: DatasourceCell {
    override func setupViews() {
        super.setupViews()
        backgroundColor = .red
    }
}

class DSDCell: DatasourceCell {
    
    override var datasourceItem: Any? {
        didSet {
            let appDelegate = UIApplication.shared.delegate as! AppDelegate
            guard let user = datasourceItem  as? RiderDSD else {return}
            nameLabel.text = user.rider_firstname + " " + user.rider_lastname
            timeLabel.text = "Time: \(user.rider_timeofdeparture_hour):\(user.rider_timeofdeparture_minute)"
            locationView.text = "\(user.rider_departure_latitude), \(user.rider_departure_longitude)"
            destinationView.text = "\(user.rider_destination_latitude), \(user.rider_destination_longitude)"
            followButton.tag = appDelegate.rd_tripid
            
        }
    }
    
    let nameLabel: UILabel = {
        let label = UILabel()
        label.backgroundColor = .white
        return label
    }()
    
    let timeLabel: UILabel = {
        let label = UILabel()
        label.backgroundColor = .white
        return label
    }()
    
    let locationView: UILabel = {
        let label = UILabel()
        label.backgroundColor = .white
        label.text = "Location: UCSC"
        return label
    }()
    
    let destinationView: UILabel = {
        let label = UILabel()
        label.backgroundColor = .white
        label.text = "Destination: Pacific Avenue"
        return label
    }()
    
    let followButton: UIButton = {
        let button = UIButton()
        button.backgroundColor = .white
        button.layer.cornerRadius = 10
        button.layer.backgroundColor = UIColor(r: 0, g: 107, b: 255).cgColor
        button.setTitle("Details", for: .normal)
        button.titleLabel?.font = UIFont.boldSystemFont(ofSize: 14)
        button.setTitleColor(UIColor.white, for: .normal)
        button.addTarget(self, action: #selector(DSDViewController.pressed), for: .touchDown)
        return button
    }()
    
    let back: UILabel = {
        let label = UILabel()
        label.layer.cornerRadius = 15
        label.layer.borderColor = UIColor.yellow.cgColor
        label.layer.borderWidth = 1
        label.layer.backgroundColor = UIColor.white.cgColor
        return label
    }()
    
    override func setupViews() {
        super.setupViews()
        
        addSubview(back)
        addSubview(nameLabel)
        addSubview(timeLabel)
        addSubview(locationView)
        addSubview(destinationView)
        addSubview(followButton)
        
        
        back.anchor(self.topAnchor, left: self.leftAnchor, bottom: self.bottomAnchor, right: self.rightAnchor, topConstant: 0, leftConstant: 4, bottomConstant: 0, rightConstant: 4, widthConstant: 0, heightConstant: 0)
        
        nameLabel.anchor(self.topAnchor, left: self.leftAnchor, bottom: nil, right: followButton.leftAnchor, topConstant: 4, leftConstant: 8, bottomConstant: 0, rightConstant: 12, widthConstant: 0, heightConstant: 20)
        
        timeLabel.anchor(nameLabel.bottomAnchor, left: nameLabel.leftAnchor, bottom: nil, right: nameLabel.rightAnchor, topConstant: 8, leftConstant: 0, bottomConstant: 0, rightConstant: 0, widthConstant: 0, heightConstant: 20)
        
        followButton.anchor(topAnchor, left: nil, bottom: nil, right: self.rightAnchor, topConstant: 8, leftConstant: 0, bottomConstant: 0, rightConstant: 12, widthConstant: 120, heightConstant: 40)
        
        locationView.anchor(timeLabel.bottomAnchor, left: timeLabel.leftAnchor, bottom: nil, right: self.rightAnchor, topConstant: 8, leftConstant: 0, bottomConstant: 0, rightConstant: 12, widthConstant: 0, heightConstant: 20)
        
        destinationView.anchor(locationView.bottomAnchor, left: locationView.leftAnchor, bottom: nil, right: self.rightAnchor, topConstant: 8, leftConstant: 0, bottomConstant: 0, rightConstant: 12, widthConstant: 0, heightConstant: 20)
        
    }
}

class DSDDataSource: Datasource {
    
    let words = ["user1", "user2", "user3"]
    
    override func footerClasses() -> [DatasourceCell.Type]? {
        return [DSDFooter.self]
    }
    
    override func headerClasses() -> [DatasourceCell.Type]? {
        return [DSDHeader.self]
    }
    
    override func cellClasses() -> [DatasourceCell.Type] {
        return [DSDCell.self]
    }
    
    override func item(_ indexPath: IndexPath) -> Any? {
        return usersSC[indexPath.item]
    }
    
    override func numberOfItems(_ section: Int) -> Int {
        return usersSC.count
    }
    
}

var usersDSD = [RiderDSD]()

class DSDViewController: DatasourceController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.navigationController?.isNavigationBarHidden = false
        wid = Int(view.frame.width)
        collectionView?.backgroundColor = UIColor(r: 0, g: 107, b: 255)
        let homeDatasource = DSDDataSource()
        self.datasource = homeDatasource
        print("success")
        getRider()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        self.navigationController?.isNavigationBarHidden = false
        wid = Int(view.frame.width)
        collectionView?.backgroundColor = UIColor(r: 0, g: 107, b: 255)
        let homeDatasource = DSDDataSource()
        self.datasource = homeDatasource
        print("success")
        getRider()
    }
    
    func getRider() {
        print("check")
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        let dict = ["email":appDelegate.user_email, "trip_id":appDelegate.rd_tripid] as [String: Any]
        print(dict)
        if let jsonData = try? JSONSerialization.data(withJSONObject: dict, options: .prettyPrinted) {
            
            print("success")
            let url = NSURL(string: "http://138.68.252.198:8000/rideshare/get_riders_on_trip/")!
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
                let arrJson = json
                print(arrJson)
                
                
                
                users.removeAll()
                let userss = arrJson as? [[String: Any]]
                for user in userss! {
                    let newRide = RiderDSD(rider_email: (user["rider_email"] as? String)!,
                                           rider_firstname: (user["rider_firstname"] as? String)!,
                                           rider_lastname: (user["rider_lastname"] as? String)!,
                                           rider_departure_longitude: (user["rider_departure_longitude"] as? Double)!,
                                           rider_departure_latitude: (user["rider_departure_latitude"] as? Double)!,
                                           rider_destination_longitude: (user["rider_destination_longitude"] as? Double)!,
                                           rider_destination_latitude: (user["rider_destination_latitude"] as? Double)!,
                                           rider_timeofdeparture_hour: (user["rider_timeofdeparture_hour"] as? Int)!,
                                           rider_timeofdeparture_minute: (user["rider_timeofdeparture_minute"] as? Int)!,
                                           rider_approved: (user["rider_approved"] as? Bool)!)
                    
                    
                    
                    
                    print(newRide)
                    usersDSD.append(newRide)
                }
                print(usersSC)
                //let storyBoard: UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
                //let newViewController = storyBoard.instantiateViewController(withIdentifier: "MenuViewController") as! MenuViewController
                //self.present(newViewController, animated: true, completion: nil)
            }
            
            task.resume()
            
        }
        
    }
    
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        self.navigationController?.isNavigationBarHidden = true
    }
    
    
    func loadDone() {
        print("load Success")
    }
    
    func pressed(button: UIButton) {
        print(button.tag)
    }
    
    override func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: view.frame.width, height: 178)
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, referenceSizeForHeaderInSection section: Int) -> CGSize {
        return CGSize(width: view.frame.width, height: 0)
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, referenceSizeForFooterInSection section: Int) -> CGSize {
        return CGSize(width: view.frame.width, height: 0)
    }
}
