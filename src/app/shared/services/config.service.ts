import { Injectable } from "@angular/core";
import { TemplateConfig } from "../template-config/config.interface";
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class ConfigService {
  unauthorized_msg = 'Unauthorized User. Please contact administrator for access.';
  welcome_msg = 'Welcome, please login to your account.';
  expired_msg = 'Session expired. Please login again.';
  host_url = 'http://ec2-3-7-8-26.ap-south-1.compute.amazonaws.com:8080';
  // host_url = 'http://localhost:8080';
  group_id = '@1435984529';
  group_filter = 'all';
  companyName = '';
  serverCpu = "45454545";
  serverIp = "222.2.21.2";
  serverMac = "565565656";

  module_names = {
    "selectone": "Select One",
    "Collection": "Collection",
    "Construction": "Construction",
    "CustomerLogin": "CustomerLogin",
    "FinancialAccounting": "FinancialAccounting",
    "LeaseMaintenance": "LeaseMaintenance",
    "PreSales": "PreSales",
    "PurchaseInventory": "PurchaseInventory",
    "Sales": "Sales"
  }
  license_types = {
    "named": "Named",
    "floating": "Floating"
  }
  isAddLicenseHidden = true;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Forwarded-For': '111.222.333.444'
  });
  page_titles = {
    'login': 'Login',
    'company': 'Group Companies',
    'license': 'Module Licenses'
  };
  cu_page = '';
  templateConf: TemplateConfig;
  company_data: object;

  //Toastr Notification Message
  group_added_successfully = "Group Company added successfully!";
  group_updated_successfully = "Group Company updated successfully!";
  license_updated_successfully = "Module License updated successfully!";
  license_added_successfully = "Module License added successfully!";

  constructor() {
    this.setConfigValue();
  }

  setConfigValue() {
    this.templateConf = {
      layout: {
        variant: "Light", // options:  Dark, Light & Transparent
        dir: "ltr", //Options: ltr, rtl
        customizer: {
          hidden: false //options: true, false
        },
        sidebar: {
          collapsed: false, //options: true, false
          size: "sidebar-md", // Options: 'sidebar-lg', 'sidebar-md', 'sidebar-sm'
          backgroundColor: "man-of-steel", // Options: 'black', 'pomegranate', 'king-yna', 'ibiza-sunset', 'flickr', 'purple-bliss', 'man-of-steel', 'purple-love'

          /* If you want transparent layout add any of the following mentioned classes to backgroundColor of sidebar option :
            bg-glass-1, bg-glass-2, bg-glass-3, bg-glass-4, bg-hibiscus, bg-purple-pizzaz, bg-blue-lagoon, bg-electric-viloet, bg-protage, bg-tundora
          */
          backgroundImage: true, // Options: true, false | Set true to show background image
          backgroundImageURL: "assets/img/sidebar-bg/01.jpg"
        }
      }
    };
  }
}
