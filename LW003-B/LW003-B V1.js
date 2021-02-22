//LW003-B Payload Decoder rule
//Creation time：2021-02-01
//Creator：Allen Zhang
//Suitable firmware versions：LW003-B v1
//Programming languages：Javascript
//Suitable platforms：TTN
function Decoder(bytes, port) {
  var decoded = {};
  var a;
  var c;
  var d;
  var b;
  var e;
  var f;
  var g;
  var h;
  if (bytes[0] == 1 )
  {
   decoded.a_Payload_Type = "The 1st Payload for device information";
   decoded.b_battery_level = bytes[1] + '%';
   decoded.c_battery_voltage = (bytes[3]*256 + bytes[2])/1000 + 'V';
   decoded.d_firmware_version = 'V' + bytes[4] +'.'+bytes[5] +'.' +bytes[6];
   if(bytes[7] == 0)
      {
        decoded.e_Frequency_Plan = "EU868";
      }
      else if (bytes[7]== 1)
      {
           decoded.e_Frequency_Plan = "US915";
      }
      else if (bytes[7]== 2)
      {
           decoded.e_Frequency_Plan = "US915 HYBRID";
      }
      else if (bytes[7]== 3)
      {
           decoded.e_Frequency_Plan = "CN779";
      }
      else if (bytes[7]== 4)
      {
           decoded.e_Frequency_Plan = "EU433";
         
      }
      else if (bytes[7]== 5)
      {
           decoded.e_Frequency_Plan = "AU915";
      }
      else if (bytes[7]== 6)
      {
           decoded.e_Frequency_Plan = "AU915 OLD";
      }
      else if (bytes[7]== 7)
      {
           decoded.e_Frequency_Plan = "CN470";
      }
      else if (bytes[7]== 8)
      {
           decoded.e_Frequency_Plan = "AS923";
      }
      else if (bytes[7]== 9)
      {
           decoded.e_Frequency_Plan = "KR920";
      }
      else if (bytes[7]== 10)
      {
           decoded.e_Frequency_Plan = "IN865";
      }
      else if (bytes[7]== 11)
      {
           decoded.e_Frequency_Plan = "CN470 PREQEL";
      }
      else 
      {
           decoded.e_Frequency_Plan = "STE920";
      }

    decoded.f_Scan_Switch_Status = (bytes[8] == 0)?'Switch off':'Switch on';
    decoded.g_BLE_Connection_Status = (bytes[9]==0)?'Disconnected':'Connected';
    decoded.h_BLE_Connection_Times = (bytes[11]*256 + bytes[10]) + 'time';
  }
  else
  {
    decoded.a1_Payload_Type = "The Payload for Beacon Data"
    decoded.a2_Total_Beacons_Quantities = bytes[1];
    if(bytes[1]>0)
    {
      decoded.a3_1st_Beacon_data_length = bytes[2] + 'bytes';
      decoded.a4_1st_Beacon_timestamp = (bytes[3]*256 + bytes[4])+ '/' + bytes[5] + '/' + bytes[6] + ' ' + bytes[7] + ':' + bytes[8] + ':' + bytes[9];
      for(c=15;c>9;c--)
      {
       if(bytes[c]<16)
       {      
          if(c==15)
          {
           d = 0 +(bytes[c].toString(16)) + ' ';
          }
          else
          {
            d = d + 0 +(bytes[c].toString(16)) + ' ';
          }
       }
       else
       {
        if(c==15)
          {
            d = (bytes[c].toString(16)) + ' ';
          }
         else
          {
            d = d + (bytes[c].toString(16)) + ' ';

          }
       }
      }
      decoded.a5_1st_Beacon_Mac_Address = d.toUpperCase();
      decoded.a6_1st_Beacon_rssi = ( bytes[16] -256 )+ 'dBm';
      if(bytes[17]<16)
      {
        
        a = 0 +(bytes[17].toString(16)) + ' ';
    
      }
      else
      {
        a = bytes[17].toString(16) + ' ';
      }
      for(c = 18;c< (bytes[2] + 3  );c++)
      {
          if(bytes[c]<16)
          {      
           a = a + 0 +(bytes[c].toString(16)) + ' ';
          }
          else
          {
            a = a + (bytes[c].toString(16)) + ' ';
          }
          decoded.a7_1st_Beacon_raw_data = a.toUpperCase();
      }     
     }
     else
     {
          return decoded;  
     }

    if(bytes[1] > 1)
    {
     
      b = bytes[2] + 3;
      decoded.b1_2nd_Beacon_data_length = bytes[b] + 'bytes';
      decoded.b2_2nd_Beacon_timestamp = (bytes[b + 1]*256 + bytes[b +2])+ '/' + bytes[b + 3] + '/' + bytes[b +4] + ' ' + bytes[b + 5] + ':' + bytes[b + 6] + ':' + bytes[b + 7];
      for(c=(b + 13);c>(b + 7);c--)
      {
       if(bytes[c]<16)
       {      
          if(c==(b + 13))
          {
           d = 0 +(bytes[c].toString(16)) + ' ';
          }
          else
          {
            d = d + 0 +(bytes[c].toString(16)) + ' ';
          }
       }
       else
       {
        if(c==(b + 13))
          {
            d = (bytes[c].toString(16)) + ' ';
          }
         else
          {
            d = d + (bytes[c].toString(16)) + ' ';

          }
       }
      }
      decoded.b3_2nd_Beacon_Mac_Address = d.toUpperCase();
      decoded.b4_2nd_Beacon_rssi = ( bytes[b + 14] -256 )+ 'dBm';
      if(bytes[b +15]<16)
      {
       
        a = 0 +(bytes[b+15].toString(16)) + ' ';
    
      }
      else
      {
        
        a = bytes[b+15].toString(16) + ' ';
      }
      for(c = (b + 16);c<(b + (bytes[b])+1);c++)
      {
          if(bytes[c]<16)
          {      
           a = a + 0 +(bytes[c].toString(16)) + ' ';
          }
          else
          {
            a = a + (bytes[c].toString(16)) + ' ';
          }
          decoded.b5_2nd_Beacon_raw_data = a.toUpperCase();
      }     
     }
     
    if(bytes[1] > 2)
    {
     
      e = b + (bytes[b]) + 1;
      decoded.c1_3rd_Beacon_data_length = bytes[e] + 'bytes';
      decoded.c2_3rd_Beacon_timestamp = (bytes[e + 1]*256 + bytes[e +2])+ '/' + bytes[e + 3] + '/' + bytes[e +4] + ' ' + bytes[e + 5] + ':' + bytes[e + 6] + ':' + bytes[e + 7];
      for(c=(e + 13);c>(e + 7);c--)
      {
       if(bytes[c]<16)
       {      
          if(c==(e + 13))
          {
           d = 0 +(bytes[c].toString(16)) + ' ';
          }
          else
          {
            d = d + 0 +(bytes[c].toString(16)) + ' ';
          }
       }
       else
       {
        if(c==(e + 13))
          {
            d = (bytes[c].toString(16)) + ' ';
          }
         else
          {
            d = d + (bytes[c].toString(16)) + ' ';

          }
       }
      }
      decoded.c3_3rd_Beacon_Mac_Address = d.toUpperCase();
      decoded.c4_3rd_Beacon_rssi = ( bytes[e + 14] -256 )+ 'dBm';
      if(bytes[e +15]<16)
      {
        
        a = 0 +(bytes[e+15].toString(16)) + ' ';
    
      }
      else
      {
      
        a = bytes[e+15].toString(16) + ' ';
      }
      for(c = (e + 16);c<(e + (bytes[e])+1);c++)
      {
          if(bytes[c]<16)
          {      
           a = a + 0 +(bytes[c].toString(16)) + ' ';
          }
          else
          {
            a = a + (bytes[c].toString(16)) + ' ';
          }
          decoded.c5_3rd_Beacon_raw_data = a.toUpperCase();
      }     
     }

     if(bytes[1] > 3)
    {
     
      f = e + (bytes[e]) + 1;
      decoded.d1_4th_Beacon_data_length = bytes[f] + 'bytes';
      decoded.d2_4th_Beacon_timestamp = (bytes[f + 1]*256 + bytes[f +2])+ '/' + bytes[f + 3] + '/' + bytes[f +4] + ' ' + bytes[f + 5] + ':' + bytes[f + 6] + ':' + bytes[f + 7];
      for(c=(f + 13);c>(f + 7);c--)
      {
       if(bytes[c]<16)
       {      
          if(c==(f + 13))
          {
           d = 0 +(bytes[c].toString(16)) + ' ';
          }
          else
          {
            d = d + 0 +(bytes[c].toString(16)) + ' ';
          }
       }
       else
       {
        if(c==(f + 13))
          {
            d = (bytes[c].toString(16)) + ' ';
          }
         else
          {
            d = d + (bytes[c].toString(16)) + ' ';

          }
       }
      }
      decoded.d3_4th_Beacon_Mac_Address = d.toUpperCase();
      decoded.d4_4th_Beacon_rssi = ( bytes[f + 14] -256 )+ 'dBm';
      if(bytes[f +15]<16)
      {
        
        a = 0 +(bytes[f+15].toString(16)) + ' ';
    
      }
      else
      {
      
        a = bytes[f+15].toString(16) + ' ';
      }
      for(c = (f + 16);c<(f + (bytes[f])+1);c++)
      {
          if(bytes[c]<16)
          {      
           a = a + 0 +(bytes[c].toString(16)) + ' ';
          }
          else
          {
            a = a + (bytes[c].toString(16)) + ' ';
          }
          decoded.d5_4th_Beacon_raw_data = a.toUpperCase();
      }     
     }
     if(bytes[1] > 4)
     {
      
       g = f + (bytes[f]) + 1;
       decoded.e1_5th_Beacon_data_length = bytes[g] + 'bytes';
       decoded.e2_5th_Beacon_timestamp = (bytes[g + 1]*256 + bytes[g +2])+ '/' + bytes[g + 3] + '/' + bytes[g +4] + ' ' + bytes[g + 5] + ':' + bytes[g + 6] + ':' + bytes[g + 7];
       for(c=(g + 13);c>(g + 7);c--)
       {
        if(bytes[c]<16)
        {      
           if(c==(g + 13))
           {
            d = 0 +(bytes[c].toString(16)) + ' ';
           }
           else
           {
             d = d + 0 +(bytes[c].toString(16)) + ' ';
           }
        }
        else
        {
         if(c==(g + 13))
           {
             d = (bytes[c].toString(16)) + ' ';
           }
          else
           {
             d = d + (bytes[c].toString(16)) + ' ';
 
           }
        }
       }
       decoded.e3_5th_Beacon_Mac_Address = d.toUpperCase();
       decoded.e4_5th_Beacon_rssi = ( bytes[g + 14] -256 )+ 'dBm';
       if(bytes[g +15]<16)
       {
         
         a = 0 +(bytes[g+15].toString(16)) + ' ';
     
       }
       else
       {
       
         a = bytes[g+15].toString(16) + ' ';
       }
       for(c = (g + 16);c<(g + (bytes[g])+1);c++)
       {
           if(bytes[c]<16)
           {      
            a = a + 0 +(bytes[c].toString(16)) + ' ';
           }
           else
           {
             a = a + (bytes[c].toString(16)) + ' ';
           }
           decoded.e5_5th_Beacon_raw_data = a.toUpperCase();
       }     
      }
      if(bytes[1] > 5)
     {
      
       h = g + (bytes[g]) + 1;
       decoded.f1_6th_Beacon_data_length = bytes[h] + 'bytes';
       decoded.f2_6th_Beacon_timestamp = (bytes[h + 1]*256 + bytes[h +2])+ '/' + bytes[h + 3] + '/' + bytes[h +4] + ' ' + bytes[h + 5] + ':' + bytes[h + 6] + ':' + bytes[h + 7];
       for(c=(h + 13);c>(h + 7);c--)
       {
        if(bytes[c]<16)
        {      
           if(c==(h + 13))
           {
            d = 0 +(bytes[c].toString(16)) + ' ';
           }
           else
           {
             d = d + 0 +(bytes[c].toString(16)) + ' ';
           }
        }
        else
        {
         if(c==(h + 13))
           {
             d = (bytes[c].toString(16)) + ' ';
           }
          else
           {
             d = d + (bytes[c].toString(16)) + ' ';
 
           }
        }
       }
       decoded.f3_6th_Beacon_Mac_Address = d.toUpperCase();
       decoded.f4_6th_Beacon_rssi = ( bytes[h + 14] -256 )+ 'dBm';
       if(bytes[h +15]<16)
       {
         
         a = 0 +(bytes[h+15].toString(16)) + ' ';
     
       }
       else
       {
       
         a = bytes[h+15].toString(16) + ' ';
       }
       for(c = (h + 16);c<(h + (bytes[h])+1);c++)
       {
           if(bytes[c]<16)
           {      
            a = a + 0 +(bytes[c].toString(16)) + ' ';
           }
           else
           {
             a = a + (bytes[c].toString(16)) + ' ';
           }
           decoded.f5_6th_Beacon_raw_data = a.toUpperCase();
       }     
      }
     else
     {
          return decoded;
     } 
}
  return decoded;
}