import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import store from "../../store/index";
import { useSelector } from "react-redux";
import { getItems } from "../../actions/products.action";
import { isAuth } from "../../actions/auth.actions";
import Topbar from "../../components/Topbar/Topbar";
import styles from "./MyOrders.module.css";
import { WrapText } from "@material-ui/icons";

const MyOrders = () => {

	return (
		<>
			{isAuth() === false ? <Redirect to="/login" /> : null}
			<ToastContainer />
			<Topbar />
			<div>
                <section class="sidebar_account" className={`${styles.sidebar_account}`}>
                    <nav>
                        <a href="/account/">My Profile</a><br/>
                        <a href="" class="current" className={`${styles.current}`}>My Orders</a><br/>
                        <a href="">Addresses</a><br/>
                        <a href="">Settings and Preferences</a><br/>
                        <a href="" class="logout" className={`${styles.logout}`}>Logout</a>
                    </nav>
                </section>
                <section class="profile" className={`${styles.profile}`}>
                <div class="container" className={`${styles.container}`}>
        <div class="tabletime" className={`${styles.tabletime}`}>
            <div class="tabletitle" className={`${styles.tabletitle}`}>
                <div class="row">
                    <div class="col-sm-4">
						<h2>Order <b>Details</b></h2>
					</div>
                </div>
            </div>
			<div class="tablefilter" className={`${styles.tablefilter}`}>
				<div class="row">
                    <div class="col1" className={`${styles.col1}`}>
						<div class="showentries" className={`${styles.showentries}`}>
							<span>Show</span>
							<select class="formcontrol" className={`${styles.formcontrol}`}>
								<option>5</option>
								<option>10</option>
								<option>15</option>
								<option>20</option>
							</select>
							<span>entries</span>
						</div>
					</div>
                    <div class="col2" className={`${styles.col2}`}>
						<button type="button" class="btn btnprimary"  className={`${styles.btn}`}><i class="fa fa-search"></i></button>
						<div class="filtergroup" className={`${styles.filtergroup}`}>
							<label>Order ID</label>
							<input type="text" class="formcontrol" className={`${styles.formcontrol}`}/>
						</div>
						<div class="filtergroup" className={`${styles.filtergroup}`}>
							<label>Status</label>
							<select class="formcontrol" className={`${styles.formcontrol}`}>
								<option>Any</option>
								<option>Delivered</option>
								<option>Shipped</option>
								<option>Pending</option>
								<option>Cancelled</option>
							</select>
						</div>
						<span class="filtericon"  className={`${styles.filtericon}`}><i class="fa fa-filter"></i></span>
                    </div>
                </div>
			</div>
            <table class="table tablestriped tablehover" className={`${styles.table}`}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Order ID</th>
						<th>Transaction ID</th>
						<th>Order Date</th>						
                        <th>Status</th>						
						<th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td><a href="#">AB23Y8123N</a></td>
						<td>32821384</td>
                        <td>Jun 15, 2017</td>                        
						<td><span class="status textsuccess"   className={`${styles.status}`} className={`${styles.textsuccess}`}>&bull;</span> Delivered</td>
						<td>₹254</td>
					
                    </tr>
					<tr>
                        <td>2</td>
                        <td><a href="#">K283UEKDJK</a></td>
                        <td>82713821</td>                       
						<td>Jun 21, 2017</td>
						<td><span class="status textinfo"  className={`${styles.status}`} className={`${styles.textinfo}`}>&bull;</span> Shipped</td>
						<td>₹1,260</td>
				
                    </tr>
					<tr>
                        <td>3</td>
                        <td><a href="#">J213BD83IKR</a></td>
						<td>621357213</td>
                        <td>Jul 04, 2017</td>
                        <td><span class="status textdanger"  className={`${styles.status}`}  className={`${styles.textdanger}`}>&bull;</span> Cancelled</td>
						<td>₹350</td>
						                      
                    </tr>
					<tr>
                        <td>4</td>
                        <td><a href="#">21JK3EJK3R</a></td>
						<td>98912873</td>
                        <td>Jul 16, 2017</td>						
						<td><span class="status textwarning"  className={`${styles.status}`}  className={`${styles.textwarning}`}>&bull;</span> Pending</td>
						<td>₹1,572</td>
						
                    </tr>
					<tr>
                        <td>5</td>
                        <td><a href="#">EJ32BJE3JJ32</a></td>
						<td>23910823</td>
                        <td>Aug 04, 2017</td>
						<td><span class="status textsuccess"  className={`${styles.status}`} className={`${styles.textsuccess}`}>&bull;</span> Delivered</td>
						<td>₹580</td>
					
                    </tr>
                </tbody>
            </table>
			<div class="clearfix"  className={`${styles.clearfix}`}>
                <div class="hinttext"   className={`${styles.hinttext}`}>Showing <b>5</b> out of <b>25</b> entries</div>
                <span>
                    <a href="" class="previous" className={`${styles.previous}`}>Previous</a>
                    <a href="" class="next" className={`${styles.next}`}>Next</a>
                </span>
            </div>
            </div>
        </div>
                </section>
            </div>
		</>
	);
};

export default MyOrders;
