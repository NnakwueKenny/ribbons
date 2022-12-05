<?php
// DB credentials.
//include '../config.php';

include_once 'util.php';
class Menu
{
    protected $text;
    protected $sessionId;


    function __construct()
    {
    }

    public function mainMenuRegistered($phoneNumber)
    {
        $data="";
        $response="";
        //shows initial user menu for registered users
        $response = "Welcome to ribbons, Select language?\n";
        $response .= "1. Hindi\n";
        $response .= "2. English\n";
        return $response;
    }
    
    public function English($textArray,$phoneNumber)
    {
        $level = count($textArray);
        $response="";
        if($level == 1){
            $response .= "CON Welcome to ribbons, Which state do you live in?\n";
            $response .= "1. Locate a Help Center\n";
            $response .= "2. Find out about (GBV)\n";
            $response .= "3. Send Complaint\n";
            echo $response;
        }elseif($level == 2 && $textArray[1] == 1){
            $response .= "CON Welcome to ribbons, Which state do you live in?\n";
            $response .= "1. Andaman and Nicobar Islands\n";
            $response .= "2. Arunachal Pradesh\n";
            $response .= "3. Daman & Diu\n";
            $response .= "4. Goa\n";
            $response .= "5. Jammu & Kashmir\n";
            $response .= "6. Puducherry\n";
            $response .= "7. Sikkim\n";
            $response .= "8. Tripura\n";
            $response .= "9. Rajasthan\n";
            echo $response;
        }elseif($level == 2 && $textArray[1] == 2){
            $response .= "CON What assistance do you need?\n";
            $response .= "1. Supplies Support\n";
            $response .= "2. Health Support\n";
            $response .= "3. Psychosocial Support\n";
            $response .= "4. WASH Support\n";
            $response .= "5. Legal Support\n";
            echo $response;
        }elseif($level == 2 && $textArray[1] == 3){
            $response .= "CON What assistance do you need?\n";
            $response .= "1. Supplies Support\n";
            $response .= "2. Health Support\n";
            $response .= "3. Psychosocial Support\n";
            $response .= "4. WASH Support\n";
            $response .= "5. Legal Support\n";
            echo $response;
        }elseif($level == 3 && $textArray[1] == 2){
            echo "CON Enter your location. e.g Mumbai, India";
        }elseif($level == 3 && $textArray[1] == 3){
            echo "CON Enter your name";
        }elseif($level == 3 && $textArray[1] == 1 && $textArray[2] == 1){
            $response .= "CON Which District?\n";
            $response .= "1. Nicobars\n";
            $response .= "2. North & Middle Andaman\n";
            $response .= "3. South Andaman\n";
            echo $response;
        }elseif($level == 3 && $textArray[1] == 1 && $textArray[2] == 2){
            $response .= "CON Which District?\n";
            $response .= "1. Papumpare\n";
            $response .= "2. East Siang \n";
            $response .= "3. Tawang\n";
            echo $response;
        }elseif($level == 3 && $textArray[1] == 1 && $textArray[2] == 3){
            $response .= "CON Which District?\n";
            $response .= "1. Diu\n";
            $response .= "2. Daman \n";
            echo $response;
        }elseif($level == 3 && $textArray[1] == 1 && $textArray[2] == 4){
            $response .= "CON Which District?\n";
            $response .= "1. North Goa\n";
            $response .= "2. South Goa \n";
            echo $response;
        }elseif($level == 3 && $textArray[1] == 1 && $textArray[2] == 5){
            $response .= "CON Which District?\n";
            $response .= "1. Anantnag\n";
            $response .= "2. Doda \n";
            $response .= "3. Kupwara \n";
            echo $response;
        }elseif($level == 3 && $textArray[1] == 1 && $textArray[2] == 6){
            $response .= "CON Which District?\n";
            $response .= "1. Karaikal\n";
            $response .= "2. Mahe \n";
            $response .= "3. Puducherry \n";
            echo $response;
        }elseif($level == 3 && $textArray[1] == 1 && $textArray[2] == 7){
            $response .= "CON Which District?\n";
            $response .= "1. East Sikkim\n";
            $response .= "2. West Sikkim\n";
            $response .= "3. North Sikkim\n";
            echo $response;
        }elseif($level == 3 && $textArray[1] == 1 && $textArray[2] == 8){
            $response .= "CON Which District?\n";
            $response .= "1. Dhalai\n";
            $response .= "2. Khowai\n";
            $response .= "3. North Tripura\n";
            echo $response;
        }elseif($level == 3 && $textArray[1] == 1 && $textArray[2] == 9){
            $response .= "CON Which District?\n";
            $response .= "1. Ajmer\n";
            $response .= "2. Baran\n";
            $response .= "3. Bharatpur\n";
            echo $response;
        }elseif($level == 4 && $textArray[1] == 1){
            $response .= "CON What assistance do you need?\n";
            $response .= "1. Supplies Support\n";
            $response .= "2. Health Support\n";
            $response .= "3. Psychosocial Support\n";
            $response .= "4. WASH Support\n";
            $response .= "5. Legal Support\n";
            echo $response;
        }elseif($level == 4 && $textArray[1] == 2){
            echo "CON Enter message";
            
        }elseif($level == 4 && $textArray[1] == 3){
            echo "CON Enter your location. e.g Mumbai, India";
            
        }elseif($level == 5 && $textArray[1] == 2){
            $type=$textArray[2];
                
                if($type == 1){
                    $type = "supplies";
                }elseif($type == 2){
                    $type = "health";
                }elseif($type == 3){
                    $type = "psychosocial";
                }elseif($type == 4){
                    $type = "WASH";
                }elseif($type == 5){
                    $type = "legal";
                }else{
                echo "END Please Select one of the option";
                }
                
                $loc=$textArray[3];
                
                $msg=$textArray[4];
                
              $data = array(
              "sender" => "$phoneNumber",
              "receiver" => "",
              "msg" => "$msg",
              "dept" => "$type",
              "loc" => "$loc",
              "source" => "1"
            );

        $curl = curl_init();
        $encode=json_encode($data);
        curl_setopt_array($curl, [
          CURLOPT_URL => "https://ribbons.onrender.com/user/chat",
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => "",
          CURLOPT_SSL_VERIFYPEER => false,
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 30,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => "POST",
          CURLOPT_POSTFIELDS => $encode,
          CURLOPT_HTTPHEADER => [
           "accept: application/json",
           "content-type: application/json"
          ],
        ]);
        
        $response = curl_exec($curl);
        $err = curl_error($curl);
        
        curl_close($curl);
        
        if ($err) {
          echo "END cURL Error #:" . $err;
        } else {
            // $resp = json_decode($response,true);
        //  var_dump ($resp);
        echo "END we would get back to you via sms";
        
        }
            
        }elseif($level == 5 && $textArray[1] == 3){
            echo "CON Describe what happened";
            
        }elseif($level == 6 && $textArray[1] == 3){
            $type=$textArray[2];
                
                if($type == 1){
                    $type = "supplies";
                }elseif($type == 2){
                    $type = "health";
                }elseif($type == 3){
                    $type = "psychosocial";
                }elseif($type == 4){
                    $type = "WASH";
                }elseif($type == 5){
                    $type = "legal";
                }else{
                echo "END Please Select one of the option";
                }
                
                $name=$textArray[3];
                $location=$textArray[4];
                $desc=$textArray[5];
                
              $data = array(
              "cat" => "$type",
              "name" => "$name",
              "desc" => "$desc",
              "medium" => "ussd",
              "status" => "false",
              "loc" => "$location",
              "phone" => "$phoneNumber"
            );

        $curl = curl_init();
        $encode=json_encode($data);
        curl_setopt_array($curl, [
          CURLOPT_URL => "https://ribbons.onrender.com/draft/send-draft",
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => "",
          CURLOPT_SSL_VERIFYPEER => false,
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 30,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => "POST",
          CURLOPT_POSTFIELDS => $encode,
          CURLOPT_HTTPHEADER => [
           "accept: application/json",
           "content-type: application/json"
          ],
        ]);
        
        $response = curl_exec($curl);
        $err = curl_error($curl);
        
        curl_close($curl);
        
        if ($err) {
          echo "END cURL Error #:" . $err;
        } else {
            // $resp = json_decode($response,true);
        //  var_dump ($resp);
        echo "END Complain Sent!, We would get back to you via SMS";
        
        }
            // Andaman and Nicobar Islands start here
        }elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 1 && $textArray[4] == 1){
            echo "END Address:One Stop Centre, Perka,\n Headquarters, Car Nicobar,\n Nicobars- 744301\n Phone Number:03193-265121 ";
        }elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 1 && $textArray[4] == 2){
            echo "END Address:One Stop Centre, Perka,\n Headquarters, Car Nicobar,\n Nicobars- 744301\n Phone Number:03193-265121 ";
        }elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 1 && $textArray[4] == 3){
            echo "END Address:One Stop Centre, Perka,\n Headquarters, Car Nicobar,\n Nicobars- 744301\n Phone Number:03193-265121 ";
        }elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 1 && $textArray[4] == 4){
            echo "END Address:One Stop Centre, Perka,\n Headquarters, Car Nicobar,\n Nicobars- 744301\n Phone Number:03193-265121 ";
        }elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 1 && $textArray[4] == 5){
            echo "END Address:One Stop Centre, Perka,\n Headquarters, Car Nicobar,\n Nicobars- 744301\n Phone Number:03193-265121 ";
        }
        
        
        elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 2 && $textArray[4] == 1){
            echo "END Address:One Stop Centre, Old DRDA Office, O/o.,\n The Deputy Commissioner, Near State Library,\n Mayabunder, North & Middle Andaman-744204\n Phone Number:03192-273009 ";
        }elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 2 && $textArray[4] == 2){
            echo "END Address:One Stop Centre, Old DRDA Office, O/o.,\n The Deputy Commissioner, Near State Library,\n Mayabunder, North & Middle Andaman-744204\n Phone Number:03192-273009 ";
        }elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 2 && $textArray[4] == 3){
            echo "END Address:One Stop Centre, Old DRDA Office, O/o.,\n The Deputy Commissioner, Near State Library,\n Mayabunder, North & Middle Andaman-744204\n Phone Number:03192-273009 ";
        }elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 2 && $textArray[4] == 4){
            echo "END Address:One Stop Centre, Old DRDA Office, O/o.,\n The Deputy Commissioner, Near State Library,\n Mayabunder, North & Middle Andaman-744204\n Phone Number:03192-273009 ";
        }elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 2 && $textArray[4] == 5){
            echo "END Address:One Stop Centre, Old DRDA Office, O/o.,\n The Deputy Commissioner, Near State Library,\n Mayabunder, North & Middle Andaman-744204\n Phone Number:03192-273009 ";
        }
        
        
 
        elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 3 && $textArray[4] == 1){
            echo "END Address:One Stop Centre, JG 6-Type, V Quarter, Near Ayush,\n (Govt.) Hospital, Junglighat, Port Blair,\nSouth Andaman District, Andaman & Nicobar Islands\n Phone Number:0319-2230504 ";
        }elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 3 && $textArray[4] == 2){
            echo "END Address:One Stop Centre, JG 6-Type, V Quarter, Near Ayush,\n (Govt.) Hospital, Junglighat, Port Blair,\nSouth Andaman District, Andaman & Nicobar Islands\n Phone Number:0319-2230504 ";
        }elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 3 && $textArray[4] == 3){
            echo "END Address:One Stop Centre, JG 6-Type, V Quarter, Near Ayush,\n (Govt.) Hospital, Junglighat, Port Blair,\nSouth Andaman District, Andaman & Nicobar Islands\n Phone Number:0319-2230504 ";
        }elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 3 && $textArray[4] == 4){
            echo "END Address:One Stop Centre, JG 6-Type, V Quarter, Near Ayush,\n (Govt.) Hospital, Junglighat, Port Blair,\nSouth Andaman District, Andaman & Nicobar Islands\n Phone Number:0319-2230504 ";
        }elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 3 && $textArray[4] == 5){
            echo "END Address:One Stop Centre, JG 6-Type, V Quarter, Near Ayush,\n (Govt.) Hospital, Junglighat, Port Blair,\nSouth Andaman District, Andaman & Nicobar Islands\n Phone Number:0319-2230504 ";
        }
            // Andaman and Nicobar Islands ends here
            
            
            // Arunachal Pradesh start here

        elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 1 && $textArray[4] == 1){
            echo "END Address:One Stop Centre, Tomo Riba Institute of Health,\n  and Medical Science (TRIHMS) Papumpare District,\n Arunachal Pradesh\n Phone Number:7085086296";
        }elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 1 && $textArray[4] == 2){
            echo "END Address:One Stop Centre, Tomo Riba Institute of Health,\n  and Medical Science (TRIHMS) Papumpare District,\n Arunachal Pradesh\n Phone Number:7085086296";
        }elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 1 && $textArray[4] == 3){
            echo "END Address:One Stop Centre, Tomo Riba Institute of Health,\n  and Medical Science (TRIHMS) Papumpare District,\n Arunachal Pradesh\n Phone Number:7085086296";
        }elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 1 && $textArray[4] == 4){
            echo "END Address:One Stop Centre, Tomo Riba Institute of Health,\n  and Medical Science (TRIHMS) Papumpare District,\n Arunachal Pradesh\n Phone Number:7085086296";
        }elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 1 && $textArray[4] == 5){
            echo "END Address:One Stop Centre, Tomo Riba Institute of Health,\n  and Medical Science (TRIHMS) Papumpare District,\n Arunachal Pradesh\n Phone Number:7085086296";
        }
        
        
        elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 2 && $textArray[4] == 1){
            echo "END Address:One Stop Centre, High Region,\n Near General Hospital, Pasighat,\n  East Siang District, Arunachal Pradesh\n Phone Number:8915900550";
        }elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 2 && $textArray[4] == 2){
            echo "END Address:One Stop Centre, High Region,\n Near General Hospital, Pasighat,\n  East Siang District, Arunachal Pradesh\n Phone Number:8915900550";
        }elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 2 && $textArray[4] == 3){
            echo "END Address:One Stop Centre, High Region,\n Near General Hospital, Pasighat,\n  East Siang District, Arunachal Pradesh\n Phone Number:8915900550";
        }elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 2 && $textArray[4] == 4){
            echo "END Address:One Stop Centre, High Region,\n Near General Hospital, Pasighat,\n  East Siang District, Arunachal Pradesh\n Phone Number:8915900550";
        }elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 2 && $textArray[4] == 5){
            echo "END Address:One Stop Centre, High Region,\n Near General Hospital, Pasighat,\n  East Siang District, Arunachal Pradesh\n Phone Number:8915900550";
        }
        
        
 
        elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 3 && $textArray[4] == 1){
            echo "END Address:One Stop Centre, DFDO Quarter,\n Craft Centre Colony, Near District Hospital,\nTawang-790104\n Phone Number:9862110421";
        }elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 3 && $textArray[4] == 2){
            echo "END Address:One Stop Centre, DFDO Quarter,\n Craft Centre Colony, Near District Hospital,\nTawang-790104\n Phone Number:9862110421";
        }elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 3 && $textArray[4] == 3){
            echo "END Address:One Stop Centre, DFDO Quarter,\n Craft Centre Colony, Near District Hospital,\nTawang-790104\n Phone Number:9862110421";
        }elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 3 && $textArray[4] == 4){
            echo "END Address:One Stop Centre, DFDO Quarter,\n Craft Centre Colony, Near District Hospital,\nTawang-790104\n Phone Number:9862110421";
        }elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 3 && $textArray[4] == 5){
            echo "END Address:One Stop Centre, DFDO Quarter,\n Craft Centre Colony, Near District Hospital,\nTawang-790104\n Phone Number:9862110421";
        }
        // Arunachal Pradesh ends here
            
            
            // Daman & Diu start here

        elseif($level == 5 && $textArray[2] == 3 && $textArray[3] == 1 && $textArray[4] == 1){
            echo "END Address:One Stop Centre, Govt. Primary Health Center, Near S.T. Bus Station, Diu, Daman & Diu (UT)\n Phone Number:9824829977";
        }elseif($level == 5 && $textArray[2] == 3 && $textArray[3] == 1 && $textArray[4] == 2){
            echo "END Address:One Stop Centre, Govt. Primary Health Center, Near S.T. Bus Station, Diu, Daman & Diu (UT)\n Phone Number:9824829977";
        }elseif($level == 5 && $textArray[2] == 3 && $textArray[3] == 1 && $textArray[4] == 3){
            echo "END Address:One Stop Centre, Govt. Primary Health Center, Near S.T. Bus Station, Diu, Daman & Diu (UT)\n Phone Number:9824829977";
        }elseif($level == 5 && $textArray[2] == 3 && $textArray[3] == 1 && $textArray[4] == 4){
            echo "END Address:One Stop Centre, Govt. Primary Health Center, Near S.T. Bus Station, Diu, Daman & Diu (UT)\n Phone Number:9824829977";
        }elseif($level == 5 && $textArray[2] == 3 && $textArray[3] == 1 && $textArray[4] == 5){
            echo "END Address:One Stop Centre, Govt. Primary Health Center, Near S.T. Bus Station, Diu, Daman & Diu (UT)\n Phone Number:9824829977";
        }
        
        
        elseif($level == 5 && $textArray[2] == 3 && $textArray[3] == 2 && $textArray[4] == 1){
            echo "END Address:One Stop Centre, Government Run Children Home Building,Ground Floor, Zari Ashram Shala Premises, Moti, Daman-396220\n Phone Number:9913737706";
        }elseif($level == 5 && $textArray[2] == 3 && $textArray[3] == 2 && $textArray[4] == 2){
            echo "END Address:One Stop Centre, Government Run Children Home Building,Ground Floor, Zari Ashram Shala Premises, Moti, Daman-396220\n Phone Number:9913737706";
        }elseif($level == 5 && $textArray[2] == 3 && $textArray[3] == 2 && $textArray[4] == 3){
            echo "END Address:One Stop Centre, Government Run Children Home Building,Ground Floor, Zari Ashram Shala Premises, Moti, Daman-396220\n Phone Number:9913737706";
        }elseif($level == 5 && $textArray[2] == 3 && $textArray[3] == 2 && $textArray[4] == 4){
            echo "END Address:One Stop Centre, Government Run Children Home Building,Ground Floor, Zari Ashram Shala Premises, Moti, Daman-396220\n Phone Number:9913737706";
        }elseif($level == 5 && $textArray[2] == 3 && $textArray[3] == 2 && $textArray[4] == 5){
            echo "END Address:One Stop Centre, Government Run Children Home Building,Ground Floor, Zari Ashram Shala Premises, Moti, Daman-396220\n Phone Number:9913737706";
        }
        // Daman & Diu ends here
            
            
            // Goa start here

        elseif($level == 5 && $textArray[2] == 4 && $textArray[3] == 1 && $textArray[4] == 1){
            echo "END Address:One Stop Centre, Goa Medical College, NH-17, Bambolim, Tiswadi, North Goa District, Goa-403202 \n Phone Number:0832-2458700";
        }elseif($level == 5 && $textArray[2] == 4 && $textArray[3] == 1 && $textArray[4] == 2){
            echo "END Address:One Stop Centre, Goa Medical College, NH-17, Bambolim, Tiswadi, North Goa District, Goa-403202 \n Phone Number:0832-2458700";
        }elseif($level == 5 && $textArray[2] == 4 && $textArray[3] == 1 && $textArray[4] == 3){
            echo "END Address:One Stop Centre, Goa Medical College, NH-17, Bambolim, Tiswadi, North Goa District, Goa-403202 \n Phone Number:0832-2458700";
        }elseif($level == 5 && $textArray[2] == 4 && $textArray[3] == 1 && $textArray[4] == 4){
            echo "END Address:One Stop Centre, Goa Medical College, NH-17, Bambolim, Tiswadi, North Goa District, Goa-403202 \n Phone Number:0832-2458700";
        }elseif($level == 5 && $textArray[2] == 4 && $textArray[3] == 1 && $textArray[4] == 5){
            echo "END Address:One Stop Centre, Goa Medical College, NH-17, Bambolim, Tiswadi, North Goa District, Goa-403202 \n Phone Number:0832-2458700";
        }
        
        
        elseif($level == 5 && $textArray[2] == 4 && $textArray[3] == 2 && $textArray[4] == 1){
            echo "END Address:One Stop Centre, Junta Quarters, Pajifond Margao, Salcete,South Goa\n Phone Number:9423884669, 9767143928";
        }elseif($level == 5 && $textArray[2] == 4 && $textArray[3] == 2 && $textArray[4] == 2){
            echo "END Address:One Stop Centre, Junta Quarters, Pajifond Margao, Salcete,South Goa\n Phone Number:9423884669, 9767143928";
        }elseif($level == 5 && $textArray[2] == 4 && $textArray[3] == 2 && $textArray[4] == 3){
            echo "END Address:One Stop Centre, Junta Quarters, Pajifond Margao, Salcete,South Goa\n Phone Number:9423884669, 9767143928";
        }elseif($level == 5 && $textArray[2] == 4 && $textArray[3] == 2 && $textArray[4] == 4){
            echo "END Address:One Stop Centre, Junta Quarters, Pajifond Margao, Salcete,South Goa\n Phone Number:9423884669, 9767143928";
        }elseif($level == 5 && $textArray[2] == 4 && $textArray[3] == 2 && $textArray[4] == 5){
            echo "END Address:One Stop Centre, Junta Quarters, Pajifond Margao, Salcete,South Goa\n Phone Number:9423884669, 9767143928";
        }
        // Goa ends here
            
            
            // Jammu & Kashmir start here

        elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 1 && $textArray[4] == 1){
            echo "END Address:Nai Basti General Bus stand Anantnag,-192101 \n Phone Number:9469444334";
        }elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 1 && $textArray[4] == 2){
            echo "END Address:Nai Basti General Bus stand Anantnag,-192101 \n Phone Number:9469444334";
        }elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 1 && $textArray[4] == 3){
            echo "END Address:Nai Basti General Bus stand Anantnag,-192101 \n Phone Number:9469444334";
        }elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 1 && $textArray[4] == 4){
            echo "END Address:Nai Basti General Bus stand Anantnag,-192101 \n Phone Number:9469444334";
        }elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 1 && $textArray[4] == 5){
            echo "END Address:Nai Basti General Bus stand Anantnag,-192101 \n Phone Number:9469444334";
        }
        
        
        elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 2 && $textArray[4] == 1){
            echo "END Address:Old RTO Office Doda Near Khan Plaza,-182202\n Phone Number:7006641890";
        }elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 2 && $textArray[4] == 2){
            echo "END Address:Old RTO Office Doda Near Khan Plaza,-182202\n Phone Number:7006641890";
        }elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 2 && $textArray[4] == 3){
            echo "END Address:Old RTO Office Doda Near Khan Plaza,-182202\n Phone Number:7006641890";
        }elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 2 && $textArray[4] == 4){
            echo "END Address:Old RTO Office Doda Near Khan Plaza,-182202\n Phone Number:7006641890";
        }elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 2 && $textArray[4] == 5){
            echo "END Address:Old RTO Office Doda Near Khan Plaza,-182202\n Phone Number:7006641890";
        }
        
        
        elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 3 && $textArray[4] == 1){
            echo "END Address:District Hospital Kupwara 193222\n Phone Number:9596444261";
        }elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 3 && $textArray[4] == 2){
            echo "END Address:District Hospital Kupwara 193222\n Phone Number:9596444261";
        }elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 3 && $textArray[4] == 3){
            echo "END Address:District Hospital Kupwara 193222\n Phone Number:9596444261";
        }elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 3 && $textArray[4] == 4){
            echo "END Address:District Hospital Kupwara 193222\n Phone Number:9596444261";
        }elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 3 && $textArray[4] == 5){
            echo "END Address:District Hospital Kupwara 193222\n Phone Number:9596444261";
        }
        // Jammu & Kashmir ends here
            
            
            // Puducherry start here

        elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 1 && $textArray[4] == 1){
            echo "END Address:One Stop Centre,RMO Quarters, Govt. General Hospital, Dr.Ambedkar Street,Karaikal\n Phone Number:04368-222444, 04368-222025";
        }elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 1 && $textArray[4] == 2){
            echo "END Address:One Stop Centre,RMO Quarters, Govt. General Hospital, Dr.Ambedkar Street,Karaikal\n Phone Number:04368-222444, 04368-222025";
        }elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 1 && $textArray[4] == 3){
            echo "END Address:One Stop Centre,RMO Quarters, Govt. General Hospital, Dr.Ambedkar Street,Karaikal\n Phone Number:04368-222444, 04368-222025";
        }elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 1 && $textArray[4] == 4){
            echo "END Address:One Stop Centre,RMO Quarters, Govt. General Hospital, Dr.Ambedkar Street,Karaikal\n Phone Number:04368-222444, 04368-222025";
        }elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 1 && $textArray[4] == 5){
            echo "END Address:One Stop Centre,RMO Quarters, Govt. General Hospital, Dr.Ambedkar Street,Karaikal\n Phone Number:04368-222444, 04368-222025";
        }
        
        
        elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 2 && $textArray[4] == 1){
            echo "END Address:One Stop Centre,Wrd No.11&12,Adjacent to Staff Sic Room,II Floor, Govt. General Hospital,Mahe\n Phone Number:0490-2332960, 0490-2336700";
        }elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 2 && $textArray[4] == 2){
            echo "END Address:One Stop Centre,Wrd No.11&12,Adjacent to Staff Sic Room,II Floor, Govt. General Hospital,Mahe\n Phone Number:0490-2332960, 0490-2336700";
        }elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 2 && $textArray[4] == 3){
            echo "END Address:One Stop Centre,Wrd No.11&12,Adjacent to Staff Sic Room,II Floor, Govt. General Hospital,Mahe\n Phone Number:0490-2332960, 0490-2336700";
        }elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 2 && $textArray[4] == 4){
            echo "END Address:One Stop Centre,Wrd No.11&12,Adjacent to Staff Sic Room,II Floor, Govt. General Hospital,Mahe\n Phone Number:0490-2332960, 0490-2336700";
        }elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 2 && $textArray[4] == 5){
            echo "END Address:One Stop Centre,Wrd No.11&12,Adjacent to Staff Sic Room,II Floor, Govt. General Hospital,Mahe\n Phone Number:0490-2332960, 0490-2336700";
        }
        
        
        elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 3 && $textArray[4] == 1){
            echo "END Address:One Stop Centre, Rajiv Gandhi Hospital, 100 Feet Road, Ellaipillaichavadi, Puducherry\n Phone Number:0413-2244964, 9842349918, 9894132392";
        }elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 3 && $textArray[4] == 2){
            echo "END Address:One Stop Centre, Rajiv Gandhi Hospital, 100 Feet Road, Ellaipillaichavadi, Puducherry\n Phone Number:0413-2244964, 9842349918, 9894132392";
        }elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 3 && $textArray[4] == 3){
            echo "END Address:One Stop Centre, Rajiv Gandhi Hospital, 100 Feet Road, Ellaipillaichavadi, Puducherry\n Phone Number:0413-2244964, 9842349918, 9894132392";
        }elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 3 && $textArray[4] == 4){
            echo "END Address:One Stop Centre, Rajiv Gandhi Hospital, 100 Feet Road, Ellaipillaichavadi, Puducherry\n Phone Number:0413-2244964, 9842349918, 9894132392";
        }elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 3 && $textArray[4] == 5){
            echo "END Address:One Stop Centre, Rajiv Gandhi Hospital, 100 Feet Road, Ellaipillaichavadi, Puducherry\n Phone Number:0413-2244964, 9842349918, 9894132392";
        }
        // Puducherry ends here
            
            
            // Sikkim start here

        elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 1 && $textArray[4] == 1){
            echo "END Address:One Stop Centre, Lumsey, 5th Mile, Tadong, Gangtok District, Sikkim\n Phone Number:9434188310, 0359-2280100";
        }elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 1 && $textArray[4] == 2){
            echo "END Address:One Stop Centre, Lumsey, 5th Mile, Tadong, Gangtok District, Sikkim\n Phone Number:9434188310, 0359-2280100";
        }elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 1 && $textArray[4] == 3){
            echo "END Address:One Stop Centre, Lumsey, 5th Mile, Tadong, Gangtok District, Sikkim\n Phone Number:9434188310, 0359-2280100";
        }elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 1 && $textArray[4] == 4){
            echo "END Address:One Stop Centre, Lumsey, 5th Mile, Tadong, Gangtok District, Sikkim\n Phone Number:9434188310, 0359-2280100";
        }elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 1 && $textArray[4] == 5){
            echo "END Address:One Stop Centre, Lumsey, 5th Mile, Tadong, Gangtok District, Sikkim\n Phone Number:9434188310, 0359-2280100";
        }
        
        
        elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 2 && $textArray[4] == 1){
            echo "END Address:One Stop Centre, Ayush Hospital, Below Kyongsa Ground, Gyalsingh, West Sikkim-737111\n Phone Number:9647490507";
        }elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 2 && $textArray[4] == 2){
            echo "END Address:One Stop Centre, Ayush Hospital, Below Kyongsa Ground, Gyalsingh, West Sikkim-737111\n Phone Number:9647490507";
        }elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 2 && $textArray[4] == 3){
            echo "END Address:One Stop Centre, Ayush Hospital, Below Kyongsa Ground, Gyalsingh, West Sikkim-737111\n Phone Number:9647490507";
        }elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 2 && $textArray[4] == 4){
            echo "END Address:One Stop Centre, Ayush Hospital, Below Kyongsa Ground, Gyalsingh, West Sikkim-737111\n Phone Number:9647490507";
        }elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 2 && $textArray[4] == 5){
            echo "END Address:One Stop Centre, Ayush Hospital, Below Kyongsa Ground, Gyalsingh, West Sikkim-737111\n Phone Number:9647490507";
        }
        
        
        elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 3 && $textArray[4] == 1){
            echo "END Address:One Stop Centre, Near Mangan District Hospital, Mangan, North Sikkim737116\n Phone Number:86705539777";
        }elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 3 && $textArray[4] == 2){
            echo "END Address:One Stop Centre, Near Mangan District Hospital, Mangan, North Sikkim737116\n Phone Number:86705539777";
        }elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 3 && $textArray[4] == 3){
            echo "END Address:One Stop Centre, Near Mangan District Hospital, Mangan, North Sikkim737116\n Phone Number:86705539777";
        }elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 3 && $textArray[4] == 4){
            echo "END Address:One Stop Centre, Near Mangan District Hospital, Mangan, North Sikkim737116\n Phone Number:86705539777";
        }elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 3 && $textArray[4] == 5){
            echo "END Address:One Stop Centre, Near Mangan District Hospital, Mangan, North Sikkim737116\n Phone Number:86705539777";
        }
        // Sikkim ends here
            
            
            // Tripura start here

        elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 1 && $textArray[4] == 1){
            echo "END Address:One Stop Centre, Anganwadi Training Centre, Kulai, Dhalai-7992014\n Phone Number:9434188310, 0359-2280100";
        }elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 1 && $textArray[4] == 2){
            echo "END Address:One Stop Centre, Anganwadi Training Centre, Kulai, Dhalai-7992014\n Phone Number:9434188310, 0359-2280100";
        }elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 1 && $textArray[4] == 3){
            echo "END Address:One Stop Centre, Anganwadi Training Centre, Kulai, Dhalai-7992014\n Phone Number:9434188310, 0359-2280100";
        }elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 1 && $textArray[4] == 4){
            echo "END Address:One Stop Centre, Anganwadi Training Centre, Kulai, Dhalai-7992014\n Phone Number:9434188310, 0359-2280100";
        }elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 1 && $textArray[4] == 5){
            echo "END Address:One Stop Centre, Anganwadi Training Centre, Kulai, Dhalai-7992014\n Phone Number:9434188310, 0359-2280100";
        }
        
        
        elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 2 && $textArray[4] == 1){
            echo "END Address:One Stop Centre, PWD Complex nearby O/0 the DM and Collector, Khowai District-799201\n Phone Number:9612428092";
        }elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 2 && $textArray[4] == 2){
            echo "END Address:One Stop Centre, PWD Complex nearby O/0 the DM and Collector, Khowai District-799201\n Phone Number:9612428092";
        }elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 2 && $textArray[4] == 3){
            echo "END Address:One Stop Centre, PWD Complex nearby O/0 the DM and Collector, Khowai District-799201\n Phone Number:9612428092";
        }elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 2 && $textArray[4] == 4){
            echo "END Address:One Stop Centre, PWD Complex nearby O/0 the DM and Collector, Khowai District-799201\n Phone Number:9612428092";
        }elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 2 && $textArray[4] == 5){
            echo "END Address:One Stop Centre, PWD Complex nearby O/0 the DM and Collector, Khowai District-799201\n Phone Number:9612428092";
        }
        
        
        elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 3 && $textArray[4] == 1){
            echo "END Address:One Stop Centre,District Hospital, North Tripura, Dharmanagar-799250, North Tripura\n Phone Number:03822220030";
        }elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 3 && $textArray[4] == 2){
            echo "END Address:One Stop Centre,District Hospital, North Tripura, Dharmanagar-799250, North Tripura\n Phone Number:03822220030";
        }elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 3 && $textArray[4] == 3){
            echo "END Address:One Stop Centre,District Hospital, North Tripura, Dharmanagar-799250, North Tripura\n Phone Number:03822220030";
        }elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 3 && $textArray[4] == 4){
            echo "END Address:One Stop Centre,District Hospital, North Tripura, Dharmanagar-799250, North Tripura\n Phone Number:03822220030";
        }elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 3 && $textArray[4] == 5){
            echo "END Address:One Stop Centre,District Hospital, North Tripura, Dharmanagar-799250, North Tripura\n Phone Number:03822220030";
        }
        // Tripura ends here
            
            
            // Rajasthan start here

        elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 1 && $textArray[4] == 1){
            echo "END Address:Raj Lok Sewa Ayog, Ajmer\n Phone Number:0145-2627154, 01452627155";
        }elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 1 && $textArray[4] == 2){
            echo "END Address:Raj Lok Sewa Ayog, Ajmer\n Phone Number:0145-2627154, 01452627155";
        }elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 1 && $textArray[4] == 3){
            echo "END Address:Raj Lok Sewa Ayog, Ajmer\n Phone Number:0145-2627154, 01452627155";
        }elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 1 && $textArray[4] == 4){
            echo "END Address:Raj Lok Sewa Ayog, Ajmer\n Phone Number:0145-2627154, 01452627155";
        }elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 1 && $textArray[4] == 5){
            echo "END Address:Raj Lok Sewa Ayog, Ajmer\n Phone Number:0145-2627154, 01452627155";
        }
        
        
        elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 2 && $textArray[4] == 1){
            echo "END Address:One Stop Centre, Room No.10,11, First Floor, Mother & Child Health Bhawan, District Hospital, Baran, Baran District, Rajasthan\n Phone Number:9828141425";
        }elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 2 && $textArray[4] == 2){
            echo "END Address:One Stop Centre, Room No.10,11, First Floor, Mother & Child Health Bhawan, District Hospital, Baran, Baran District, Rajasthan\n Phone Number:9828141425";
        }elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 2 && $textArray[4] == 3){
            echo "END Address:One Stop Centre, Room No.10,11, First Floor, Mother & Child Health Bhawan, District Hospital, Baran, Baran District, Rajasthan\n Phone Number:9828141425";
        }elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 2 && $textArray[4] == 4){
            echo "END Address:One Stop Centre, Room No.10,11, First Floor, Mother & Child Health Bhawan, District Hospital, Baran, Baran District, Rajasthan\n Phone Number:9828141425";
        }elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 2 && $textArray[4] == 5){
            echo "END Address:One Stop Centre, Room No.10,11, First Floor, Mother & Child Health Bhawan, District Hospital, Baran, Baran District, Rajasthan\n Phone Number:9828141425";
        }
        
        
        elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 3 && $textArray[4] == 1){
            echo "END Address:Nagr Nigam Aashray Sthal, District Hospital Campur, Bharatpur-321001\n Phone Number:03822220030";
        }elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 3 && $textArray[4] == 2){
            echo "END Address:Nagr Nigam Aashray Sthal, District Hospital Campur, Bharatpur-321001\n Phone Number:03822220030";
        }elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 3 && $textArray[4] == 3){
            echo "END Address:Nagr Nigam Aashray Sthal, District Hospital Campur, Bharatpur-321001\n Phone Number:03822220030";
        }elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 3 && $textArray[4] == 4){
            echo "END Address:Nagr Nigam Aashray Sthal, District Hospital Campur, Bharatpur-321001\n Phone Number:03822220030";
        }elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 3 && $textArray[4] == 5){
            echo "END Address:Nagr Nigam Aashray Sthal, District Hospital Campur, Bharatpur-321001\n Phone Number:03822220030";
        }
        // Rajasthan ends here
    }
    
    
    
    
    
    
    
    
   public function Hindi($textArray,$phoneNumber)
    {
        $level = count($textArray);
        $response="";
        if($level == 1){
            $response .= "CON में आपका स्वागत है ribbons, भाषा चुनें?\n";
            $response .= "1. एक सहायता केंद्र का पता ल zगाएँ\n";
            $response .= "2. (जीबीवी) के बारे में पता करें\n";
            $response .= "3. शिकायत भेजें\n";
            echo $response;
        }elseif($level == 2 && $textArray[1] == 1){
            $response .= "CON आपका स्वागत है ribbons आप किस राज्य में रहते हैंe?\n";
            $response .= "1. अंडमान व नोकोबार द्वीप समूह\n";
            $response .= "2. अरुणाचल प्रदेश\n";
            $response .= "3. दमन और दीव\n";
            $response .= "4. गोवा\n";
            $response .= "5. जम्मू और कश्मीर\n";
            $response .= "6. पुदुचेरी\n";
            $response .= "7. सिक्किम\n";
            $response .= "8. त्रिपुरा\n";
            $response .= "9. राजस्थान\n";
            echo $response;
        }elseif($level == 2 && $textArray[1] == 2){
            $response .= "CON आपको किस सहायता की आवश्यकता है?\n";
            $response .= "1. आपूर्ति समर्थन\n";
            $response .= "2. स्वास्थ्य सहायता\n";
            $response .= "3. मनोसामाजिक समर्थन\n";
            $response .= "4. वॉश सपोर्ट\n";
            $response .= "5. विधिक सहायता\n";
            echo $response;
        }elseif($level == 2 && $textArray[1] == 3){
            $response .= "CON आपको किस सहायता की आवश्यकता है?\n";
            $response .= "1. आपूर्ति समर्थन\n";
            $response .= "2. स्वास्थ्य सहायता\n";
            $response .= "3. मनोसामाजिक समर्थन\n";
            $response .= "4. वॉश सपोर्ट\n";
            $response .= "5. विधिक सहायता\n";
            echo $response;
        }elseif($level == 3 && $textArray[1] == 2){
            echo "CON Eअपनी स्थिति दर्ज़ करें. e.g Mumbai, India";
        }elseif($level == 3 && $textArray[1] == 3){
            echo "CON अपना नाम दर्ज करें";
        }elseif($level == 3 && $textArray[1] == 1 && $textArray[2] == 1){
            $response .= "CON कौन - सा जिला?\n";
            $response .= "1. निकोबार\n";
            $response .= "2. उत्तर और मध्य अंडमान\n";
            $response .= "3. दक्षिण अंडमान\n";
            echo $response;
        }elseif($level == 3 && $textArray[1] == 1 && $textArray[2] == 2){
            $response .= "CON कौन - सा जिला?\n";
            $response .= "1. पापुमपारे\n";
            $response .= "2. पूर्वी सियांग \n";
            $response .= "3. तवांग\n";
            echo $response;
        }elseif($level == 3 && $textArray[1] == 1 && $textArray[2] == 3){
            $response .= "CON कौन - सा जिला?\n";
            $response .= "1. दीव\n";
            $response .= "2. दमन \n";
            echo $response;
        }elseif($level == 3 && $textArray[1] == 1 && $textArray[2] == 4){
            $response .= "CON कौन - सा जिला?\n";
            $response .= "1. उत्तरी गोवा\n";
            $response .= "2. दक्षिण गोवा \n";
            echo $response;
        }elseif($level == 3 && $textArray[1] == 1 && $textArray[2] == 5){
            $response .= "CON कौन - सा जिला?\n";
            $response .= "1. अनंतनाग\n";
            $response .= "2. डोडा \n";
            $response .= "3. कुपवाड़ा \n";
            echo $response;
        }elseif($level == 3 && $textArray[1] == 1 && $textArray[2] == 6){
            $response .= "CON कौन - सा जिला?\n";
            $response .= "1. कराईकल\n";
            $response .= "2. माहे \n";
            $response .= "3. पुदुचेरी \n";
            echo $response;
        }elseif($level == 3 && $textArray[1] == 1 && $textArray[2] == 7){
            $response .= "CON कौन - सा जिला?\n";
            $response .= "1. पूर्वी सिक्किम\n";
            $response .= "2. पश्चिम सिक्किम\n";
            $response .= "3. उत्तरी सिक्किम\n";
            echo $response;
        }elseif($level == 3 && $textArray[1] == 1 && $textArray[2] == 8){
            $response .= "CON कौन - सा जिला?\n";
            $response .= "1. धलाई\n";
            $response .= "2. खोवाई\n";
            $response .= "3. उत्तर त्रिपुरा\n";
            echo $response;
        }elseif($level == 3 && $textArray[1] == 1 && $textArray[2] == 9){
            $response .= "CON कौन - सा जिला?\n";
            $response .= "1. अजमेर\n";
            $response .= "2. बरन\n";
            $response .= "3. भरतपुर\n";
            echo $response;
        }elseif($level == 4 && $textArray[1] == 1){
            $response .= "CON आपको किस सहायता की आवश्यकता है?\n";
            $response .= "1. आपूर्ति समर्थन\n";
            $response .= "2. स्वास्थ्य सहायता\n";
            $response .= "3. मनोसामाजिक समर्थन\n";
            $response .= "4. वॉश सपोर्ट\n";
            $response .= "5. विधिक सहायता\n";
            echo $response;
        }elseif($level == 4 && $textArray[1] == 2){
            echo "CON संदेश दर्ज करें";
            
        }elseif($level == 4 && $textArray[1] == 3){
            echo "CON अपनी स्थिति दर्ज़ करें. e.g Mumbai, India";
            
        }elseif($level == 5 && $textArray[1] == 2){
            $type=$textArray[2];
                
                if($type == 1){
                    $type = "supplies";
                }elseif($type == 2){
                    $type = "health";
                }elseif($type == 3){
                    $type = "psychosocial";
                }elseif($type == 4){
                    $type = "WASH";
                }elseif($type == 5){
                    $type = "legal";
                }else{
                echo "END कृपया विकल्पों में से एक का चयन करें";
                }
                
                $loc=$textArray[3];
                
                $msg=$textArray[4];
                
              $data = array(
              "sender" => "$phoneNumber",
              "receiver" => "",
              "msg" => "$msg",
              "dept" => "$type",
              "loc" => "$loc",
              "source" => "1"
            );

        $curl = curl_init();
        $encode=json_encode($data);
        curl_setopt_array($curl, [
          CURLOPT_URL => "https://ribbons.onrender.com/user/chat",
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => "",
          CURLOPT_SSL_VERIFYPEER => false,
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 30,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => "POST",
          CURLOPT_POSTFIELDS => $encode,
          CURLOPT_HTTPHEADER => [
           "accept: application/json",
           "content-type: application/json"
          ],
        ]);
        
        $response = curl_exec($curl);
        $err = curl_error($curl);
        
        curl_close($curl);
        
        if ($err) {
          echo "END cURL Error #:" . $err;
        } else {
            // $resp = json_decode($response,true);
        //  var_dump ($resp);
        echo "END हम आपको एसएमएस के माध्यम से वापस मिलेंगे";
        
        }
            
        }elseif($level == 5 && $textArray[1] == 3){
            echo "CON वर्णन करें कि क्या हुआ";
            
        }elseif($level == 6 && $textArray[1] == 3){
            $type=$textArray[2];
                
                if($type == 1){
                    $type = "supplies";
                }elseif($type == 2){
                    $type = "health";
                }elseif($type == 3){
                    $type = "psychosocial";
                }elseif($type == 4){
                    $type = "WASH";
                }elseif($type == 5){
                    $type = "legal";
                }else{
                echo "END कृपया विकल्पों में से एक का चयन करें";
                }
                
                $name=$textArray[3];
                $location=$textArray[4];
                $desc=$textArray[5];
                
              $data = array(
              "cat" => "$type",
              "name" => "$name",
              "desc" => "$desc",
              "medium" => "ussd",
              "status" => "false",
              "loc" => "$location",
              "phone" => "$phoneNumber"
            );

        $curl = curl_init();
        $encode=json_encode($data);
        curl_setopt_array($curl, [
          CURLOPT_URL => "https://ribbons.onrender.com/draft/send-draft",
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => "",
          CURLOPT_SSL_VERIFYPEER => false,
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 30,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => "POST",
          CURLOPT_POSTFIELDS => $encode,
          CURLOPT_HTTPHEADER => [
           "accept: application/json",
           "content-type: application/json"
          ],
        ]);
        
        $response = curl_exec($curl);
        $err = curl_error($curl);
        
        curl_close($curl);
        
        if ($err) {
          echo "END cURL Error #:" . $err;
        } else {
            // $resp = json_decode($response,true);
        //  var_dump ($resp);
        echo "END शिकायत भेजी गई!, हम आपसे एसएमएस के माध्यम से संपर्क करेंगे";
        
        }
            // Andaman and Nicobar Islands start here
        }elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 1 && $textArray[4] == 1){
            echo "END पता: वन स्टॉप सेंटर, पेरका, मुख्यालय, कार निकोबार, निकोबार- 744301\n  फ़ोन नंबर:03193-265121 ";
        }elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 1 && $textArray[4] == 2){
            echo "END पता: वन स्टॉप सेंटर, पेरका, मुख्यालय, कार निकोबार, निकोबार- 744301\n  फ़ोन नंबर:03193-265121 ";
        }elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 1 && $textArray[4] == 3){
            echo "END पता: वन स्टॉप सेंटर, पेरका, मुख्यालय, कार निकोबार, निकोबार- 744301\n  फ़ोन नंबर:03193-265121 ";
        }elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 1 && $textArray[4] == 4){
            echo "END पता: वन स्टॉप सेंटर, पेरका, मुख्यालय, कार निकोबार, निकोबार- 744301\n  फ़ोन नंबर:03193-265121 ";
        }elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 1 && $textArray[4] == 5){
            echo "END पता: वन स्टॉप सेंटर, पेरका, मुख्यालय, कार निकोबार, निकोबार- 744301\n  फ़ोन नंबर:03193-265121 ";
        }
        
        
        elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 2 && $textArray[4] == 1){
            echo "END पता: वन स्टॉप सेंटर, पुराना डीआरडीए कार्यालय, ओ / ओ, उपायुक्त, राज्य पुस्तकालय के पास, मायाबंदर, उत्तर और मध्य अंडमान -744204\n फोन नंबर: 03192-273009";
        }elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 2 && $textArray[4] == 2){
            echo "END पता: वन स्टॉप सेंटर, पुराना डीआरडीए कार्यालय, ओ / ओ, उपायुक्त, राज्य पुस्तकालय के पास, मायाबंदर, उत्तर और मध्य अंडमान -744204\n फोन नंबर: 03192-273009";
        }elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 2 && $textArray[4] == 3){
            echo "END पता: वन स्टॉप सेंटर, पुराना डीआरडीए कार्यालय, ओ / ओ, उपायुक्त, राज्य पुस्तकालय के पास, मायाबंदर, उत्तर और मध्य अंडमान -744204\n फोन नंबर: 03192-273009";
        }elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 2 && $textArray[4] == 4){
            echo "END पता: वन स्टॉप सेंटर, पुराना डीआरडीए कार्यालय, ओ / ओ, उपायुक्त, राज्य पुस्तकालय के पास, मायाबंदर, उत्तर और मध्य अंडमान -744204\n फोन नंबर: 03192-273009";
        }elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 2 && $textArray[4] == 5){
            echo "END पता: वन स्टॉप सेंटर, पुराना डीआरडीए कार्यालय, ओ / ओ, उपायुक्त, राज्य पुस्तकालय के पास, मायाबंदर, उत्तर और मध्य अंडमान -744204\n फोन नंबर: 03192-273009";
        }
        
        
 
        elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 3 && $textArray[4] == 1){
            echo "END पता: वन स्टॉप सेंटर, जेजी 6-टाइप, वी क्वार्टर, आयुष के पास, (सरकारी) अस्पताल, जंगलीघाट, पोर्ट ब्लेयर, दक्षिण अंडमान जिला, अंडमान और निकोबार द्वीप समूह फोन नंबर: 0319-2230504";
        }elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 3 && $textArray[4] == 2){
            echo "END पता: वन स्टॉप सेंटर, जेजी 6-टाइप, वी क्वार्टर, आयुष के पास, (सरकारी) अस्पताल, जंगलीघाट, पोर्ट ब्लेयर, दक्षिण अंडमान जिला, अंडमान और निकोबार द्वीप समूह फोन नंबर: 0319-2230504";
        }elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 3 && $textArray[4] == 3){
            echo "END पता: वन स्टॉप सेंटर, जेजी 6-टाइप, वी क्वार्टर, आयुष के पास, (सरकारी) अस्पताल, जंगलीघाट, पोर्ट ब्लेयर, दक्षिण अंडमान जिला, अंडमान और निकोबार द्वीप समूह फोन नंबर: 0319-2230504";
        }elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 3 && $textArray[4] == 4){
            echo "END पता: वन स्टॉप सेंटर, जेजी 6-टाइप, वी क्वार्टर, आयुष के पास, (सरकारी) अस्पताल, जंगलीघाट, पोर्ट ब्लेयर, दक्षिण अंडमान जिला, अंडमान और निकोबार द्वीप समूह फोन नंबर: 0319-2230504";
        }elseif($level == 5 && $textArray[2] == 1 && $textArray[3] == 3 && $textArray[4] == 5){
            echo "END पता: वन स्टॉप सेंटर, जेजी 6-टाइप, वी क्वार्टर, आयुष के पास, (सरकारी) अस्पताल, जंगलीघाट, पोर्ट ब्लेयर, दक्षिण अंडमान जिला, अंडमान और निकोबार द्वीप समूह फोन नंबर: 0319-2230504";
        }
            // Andaman and Nicobar Islands ends here
            
            
            // Arunachal Pradesh start here

        elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 1 && $textArray[4] == 1){
            echo "END पता: वन स्टॉप सेंटर, टोमो रीबा इंस्टीट्यूट ऑफ हेल्थ, एंड मेडिकल साइंस (TRIHMS) पापुमपारे जिला, अरुणाचल प्रदेश\n फोन नंबर: 7085086296";
        }elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 1 && $textArray[4] == 2){
            echo "END पता: वन स्टॉप सेंटर, टोमो रीबा इंस्टीट्यूट ऑफ हेल्थ, एंड मेडिकल साइंस (TRIHMS) पापुमपारे जिला, अरुणाचल प्रदेश\n फोन नंबर: 7085086296";
        }elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 1 && $textArray[4] == 3){
            echo "END पता: वन स्टॉप सेंटर, टोमो रीबा इंस्टीट्यूट ऑफ हेल्थ, एंड मेडिकल साइंस (TRIHMS) पापुमपारे जिला, अरुणाचल प्रदेश\n फोन नंबर: 7085086296";
        }elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 1 && $textArray[4] == 4){
            echo "END पता: वन स्टॉप सेंटर, टोमो रीबा इंस्टीट्यूट ऑफ हेल्थ, एंड मेडिकल साइंस (TRIHMS) पापुमपारे जिला, अरुणाचल प्रदेश\n फोन नंबर: 7085086296";
        }elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 1 && $textArray[4] == 5){
            echo "END पता: वन स्टॉप सेंटर, टोमो रीबा इंस्टीट्यूट ऑफ हेल्थ, एंड मेडिकल साइंस (TRIHMS) पापुमपारे जिला, अरुणाचल प्रदेश\n फोन नंबर: 7085086296";
        }
        
        
        elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 2 && $textArray[4] == 1){
            echo "END पता: वन स्टॉप सेंटर, उच्च क्षेत्र, सामान्य अस्पताल के पास, पासीघाट, पूर्वी सियांग जिला, अरुणाचल प्रदेश फोन नंबर: 8915900550";
        }elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 2 && $textArray[4] == 2){
            echo "END पता: वन स्टॉप सेंटर, उच्च क्षेत्र, सामान्य अस्पताल के पास, पासीघाट, पूर्वी सियांग जिला, अरुणाचल प्रदेश फोन नंबर: 8915900550";
        }elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 2 && $textArray[4] == 3){
            echo "END पता: वन स्टॉप सेंटर, उच्च क्षेत्र, सामान्य अस्पताल के पास, पासीघाट, पूर्वी सियांग जिला, अरुणाचल प्रदेश फोन नंबर: 8915900550";
        }elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 2 && $textArray[4] == 4){
            echo "END पता: वन स्टॉप सेंटर, उच्च क्षेत्र, सामान्य अस्पताल के पास, पासीघाट, पूर्वी सियांग जिला, अरुणाचल प्रदेश फोन नंबर: 8915900550";
        }elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 2 && $textArray[4] == 5){
            echo "END पता: वन स्टॉप सेंटर, उच्च क्षेत्र, सामान्य अस्पताल के पास, पासीघाट, पूर्वी सियांग जिला, अरुणाचल प्रदेश फोन नंबर: 8915900550";
        }
        
        
 
        elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 3 && $textArray[4] == 1){
            echo "END पता: वन स्टॉप सेंटर, डीएफडीओ क्वार्टर, क्राफ्ट सेंटर कॉलोनी, जिला अस्पताल के पास, तवांग -790104 फोन नंबर: 9862110421";
        }elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 3 && $textArray[4] == 2){
            echo "END पता: वन स्टॉप सेंटर, डीएफडीओ क्वार्टर, क्राफ्ट सेंटर कॉलोनी, जिला अस्पताल के पास, तवांग -790104 फोन नंबर: 9862110421";
        }elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 3 && $textArray[4] == 3){
            echo "END पता: वन स्टॉप सेंटर, डीएफडीओ क्वार्टर, क्राफ्ट सेंटर कॉलोनी, जिला अस्पताल के पास, तवांग -790104 फोन नंबर: 9862110421";
        }elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 3 && $textArray[4] == 4){
            echo "END पता: वन स्टॉप सेंटर, डीएफडीओ क्वार्टर, क्राफ्ट सेंटर कॉलोनी, जिला अस्पताल के पास, तवांग -790104 फोन नंबर: 9862110421";
        }elseif($level == 5 && $textArray[2] == 2 && $textArray[3] == 3 && $textArray[4] == 5){
            echo "END पता: वन स्टॉप सेंटर, डीएफडीओ क्वार्टर, क्राफ्ट सेंटर कॉलोनी, जिला अस्पताल के पास, तवांग -790104 फोन नंबर: 9862110421";
        }
        // Arunachal Pradesh ends here
            
            
            // Daman & Diu start here

        elseif($level == 5 && $textArray[2] == 3 && $textArray[3] == 1 && $textArray[4] == 1){
            echo "END पता: वन स्टॉप सेंटर, सरकार। प्राथमिक स्वास्थ्य केंद्र, एस.टी. बस स्टेशन, दीव, दमन और दीव (यूटी)\n फोन नंबर: 9824829977";
        }elseif($level == 5 && $textArray[2] == 3 && $textArray[3] == 1 && $textArray[4] == 2){
            echo "END पता: वन स्टॉप सेंटर, सरकार। प्राथमिक स्वास्थ्य केंद्र, एस.टी. बस स्टेशन, दीव, दमन और दीव (यूटी)\n फोन नंबर: 9824829977";
        }elseif($level == 5 && $textArray[2] == 3 && $textArray[3] == 1 && $textArray[4] == 3){
            echo "END पता: वन स्टॉप सेंटर, सरकार। प्राथमिक स्वास्थ्य केंद्र, एस.टी. बस स्टेशन, दीव, दमन और दीव (यूटी)\n फोन नंबर: 9824829977";
        }elseif($level == 5 && $textArray[2] == 3 && $textArray[3] == 1 && $textArray[4] == 4){
            echo "END पता: वन स्टॉप सेंटर, सरकार। प्राथमिक स्वास्थ्य केंद्र, एस.टी. बस स्टेशन, दीव, दमन और दीव (यूटी)\n फोन नंबर: 9824829977";
        }elseif($level == 5 && $textArray[2] == 3 && $textArray[3] == 1 && $textArray[4] == 5){
            echo "END पता: वन स्टॉप सेंटर, सरकार। प्राथमिक स्वास्थ्य केंद्र, एस.टी. बस स्टेशन, दीव, दमन और दीव (यूटी)\n फोन नंबर: 9824829977";
        }
        
        
        elseif($level == 5 && $textArray[2] == 3 && $textArray[3] == 2 && $textArray[4] == 1){
            echo "END पता: वन स्टॉप सेंटर, सरकार द्वारा संचालित चिल्ड्रन होम बिल्डिंग, ग्राउंड फ्लोर, जरी आश्रम शाला परिसर, मोती, दमन -396220\n फोन नंबर: 9913737706";
        }elseif($level == 5 && $textArray[2] == 3 && $textArray[3] == 2 && $textArray[4] == 2){
            echo "END पता: वन स्टॉप सेंटर, सरकार द्वारा संचालित चिल्ड्रन होम बिल्डिंग, ग्राउंड फ्लोर, जरी आश्रम शाला परिसर, मोती, दमन -396220\n फोन नंबर: 9913737706";
        }elseif($level == 5 && $textArray[2] == 3 && $textArray[3] == 2 && $textArray[4] == 3){
            echo "END पता: वन स्टॉप सेंटर, सरकार द्वारा संचालित चिल्ड्रन होम बिल्डिंग, ग्राउंड फ्लोर, जरी आश्रम शाला परिसर, मोती, दमन -396220\n फोन नंबर: 9913737706";
        }elseif($level == 5 && $textArray[2] == 3 && $textArray[3] == 2 && $textArray[4] == 4){
            echo "END पता: वन स्टॉप सेंटर, सरकार द्वारा संचालित चिल्ड्रन होम बिल्डिंग, ग्राउंड फ्लोर, जरी आश्रम शाला परिसर, मोती, दमन -396220\n फोन नंबर: 9913737706";
        }elseif($level == 5 && $textArray[2] == 3 && $textArray[3] == 2 && $textArray[4] == 5){
            echo "END पता: वन स्टॉप सेंटर, सरकार द्वारा संचालित चिल्ड्रन होम बिल्डिंग, ग्राउंड फ्लोर, जरी आश्रम शाला परिसर, मोती, दमन -396220\n फोन नंबर: 9913737706";
        }
        // Daman & Diu ends here
            
            
            // Goa start here

        elseif($level == 5 && $textArray[2] == 4 && $textArray[3] == 1 && $textArray[4] == 1){
            echo "END पता: वन स्टॉप सेंटर, गोवा मेडिकल कॉलेज, NH-17, बम्बोलिम, तिस्वाड़ी, उत्तरी गोवा जिला, गोवा -403202 फोन नंबर: 0832-2458700";
        }elseif($level == 5 && $textArray[2] == 4 && $textArray[3] == 1 && $textArray[4] == 2){
            echo "END पता: वन स्टॉप सेंटर, गोवा मेडिकल कॉलेज, NH-17, बम्बोलिम, तिस्वाड़ी, उत्तरी गोवा जिला, गोवा -403202 फोन नंबर: 0832-2458700";
        }elseif($level == 5 && $textArray[2] == 4 && $textArray[3] == 1 && $textArray[4] == 3){
            echo "END पता: वन स्टॉप सेंटर, गोवा मेडिकल कॉलेज, NH-17, बम्बोलिम, तिस्वाड़ी, उत्तरी गोवा जिला, गोवा -403202 फोन नंबर: 0832-2458700";
        }elseif($level == 5 && $textArray[2] == 4 && $textArray[3] == 1 && $textArray[4] == 4){
            echo "END पता: वन स्टॉप सेंटर, गोवा मेडिकल कॉलेज, NH-17, बम्बोलिम, तिस्वाड़ी, उत्तरी गोवा जिला, गोवा -403202 फोन नंबर: 0832-2458700";
        }elseif($level == 5 && $textArray[2] == 4 && $textArray[3] == 1 && $textArray[4] == 5){
            echo "END पता: वन स्टॉप सेंटर, गोवा मेडिकल कॉलेज, NH-17, बम्बोलिम, तिस्वाड़ी, उत्तरी गोवा जिला, गोवा -403202 फोन नंबर: 0832-2458700";
        }
        
        
        elseif($level == 5 && $textArray[2] == 4 && $textArray[3] == 2 && $textArray[4] == 1){
            echo "END पता: वन स्टॉप सेंटर, जुंटा क्वार्टर, पजीफोंड मार्गो, सलसेटे, दक्षिण गोवा फोन नंबर: 9423884669, 9767143928";
        }elseif($level == 5 && $textArray[2] == 4 && $textArray[3] == 2 && $textArray[4] == 2){
            echo "END पता: वन स्टॉप सेंटर, जुंटा क्वार्टर, पजीफोंड मार्गो, सलसेटे, दक्षिण गोवा फोन नंबर: 9423884669, 9767143928";
        }elseif($level == 5 && $textArray[2] == 4 && $textArray[3] == 2 && $textArray[4] == 3){
            echo "END पता: वन स्टॉप सेंटर, जुंटा क्वार्टर, पजीफोंड मार्गो, सलसेटे, दक्षिण गोवा फोन नंबर: 9423884669, 9767143928";
        }elseif($level == 5 && $textArray[2] == 4 && $textArray[3] == 2 && $textArray[4] == 4){
            echo "END पता: वन स्टॉप सेंटर, जुंटा क्वार्टर, पजीफोंड मार्गो, सलसेटे, दक्षिण गोवा फोन नंबर: 9423884669, 9767143928";
        }elseif($level == 5 && $textArray[2] == 4 && $textArray[3] == 2 && $textArray[4] == 5){
            echo "END पता: वन स्टॉप सेंटर, जुंटा क्वार्टर, पजीफोंड मार्गो, सलसेटे, दक्षिण गोवा फोन नंबर: 9423884669, 9767143928";
        }
        // Goa ends here
            
            
            // Jammu & Kashmir start here

        elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 1 && $textArray[4] == 1){
            echo "END पता: नई बस्ती जनरल बस स्टैंड अनंतनाग, -192101 फोन नंबर: 9469444334";
        }elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 1 && $textArray[4] == 2){
            echo "END पता: नई बस्ती जनरल बस स्टैंड अनंतनाग, -192101 फोन नंबर: 9469444334";
        }elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 1 && $textArray[4] == 3){
            echo "END पता: नई बस्ती जनरल बस स्टैंड अनंतनाग, -192101 फोन नंबर: 9469444334";
        }elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 1 && $textArray[4] == 4){
            echo "END पता: नई बस्ती जनरल बस स्टैंड अनंतनाग, -192101 फोन नंबर: 9469444334";
        }elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 1 && $textArray[4] == 5){
            echo "END पता: नई बस्ती जनरल बस स्टैंड अनंतनाग, -192101 फोन नंबर: 9469444334";
        }
        
        
        elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 2 && $textArray[4] == 1){
            echo "END पता: पुराना आरटीओ कार्यालय डोडा खान प्लाजा के पास, -182202\n फोन नंबर: 7006641890";
        }elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 2 && $textArray[4] == 2){
            echo "END पता: पुराना आरटीओ कार्यालय डोडा खान प्लाजा के पास, -182202\n फोन नंबर: 7006641890";
        }elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 2 && $textArray[4] == 3){
            echo "END पता: पुराना आरटीओ कार्यालय डोडा खान प्लाजा के पास, -182202\n फोन नंबर: 7006641890";
        }elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 2 && $textArray[4] == 4){
            echo "END पता: पुराना आरटीओ कार्यालय डोडा खान प्लाजा के पास, -182202\n फोन नंबर: 7006641890";
        }elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 2 && $textArray[4] == 5){
            echo "END पता: पुराना आरटीओ कार्यालय डोडा खान प्लाजा के पास, -182202\n फोन नंबर: 7006641890";
        }
        
        
        elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 3 && $textArray[4] == 1){
            echo "END पता:जिला अस्पताल कुपवाड़ा 193222\n फोन नंबर:9596444261";
        }elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 3 && $textArray[4] == 2){
            echo "END पता:जिला अस्पताल कुपवाड़ा 193222\n फोन नंबर:9596444261";
        }elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 3 && $textArray[4] == 3){
            echo "END पता:जिला अस्पताल कुपवाड़ा 193222\n फोन नंबर:9596444261";
        }elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 3 && $textArray[4] == 4){
            echo "END पता:जिला अस्पताल कुपवाड़ा 193222\n फोन नंबर:9596444261";
        }elseif($level == 5 && $textArray[2] == 5 && $textArray[3] == 3 && $textArray[4] == 5){
            echo "END पता:जिला अस्पताल कुपवाड़ा 193222\n फोन नंबर:9596444261";
        }
        // Jammu & Kashmir ends here
            
            
            // Puducherry start here

        elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 1 && $textArray[4] == 1){
            echo "END पता: वन स्टॉप सेंटर, आरएमओ क्वार्टर, सरकार। सामान्य अस्पताल, डॉ अंबेडकर स्ट्रीट, कराईकल\n फोन नंबर: 04368-222444, 04368-222025";
        }elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 1 && $textArray[4] == 2){
            echo "END पता: वन स्टॉप सेंटर, आरएमओ क्वार्टर, सरकार। सामान्य अस्पताल, डॉ अंबेडकर स्ट्रीट, कराईकल\n फोन नंबर: 04368-222444, 04368-222025";
        }elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 1 && $textArray[4] == 3){
            echo "END पता: वन स्टॉप सेंटर, आरएमओ क्वार्टर, सरकार। सामान्य अस्पताल, डॉ अंबेडकर स्ट्रीट, कराईकल\n फोन नंबर: 04368-222444, 04368-222025";
        }elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 1 && $textArray[4] == 4){
            echo "END पता: वन स्टॉप सेंटर, आरएमओ क्वार्टर, सरकार। सामान्य अस्पताल, डॉ अंबेडकर स्ट्रीट, कराईकल\n फोन नंबर: 04368-222444, 04368-222025";
        }elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 1 && $textArray[4] == 5){
            echo "END पता: वन स्टॉप सेंटर, आरएमओ क्वार्टर, सरकार। सामान्य अस्पताल, डॉ अंबेडकर स्ट्रीट, कराईकल\n फोन नंबर: 04368-222444, 04368-222025";
        }
        
        
        elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 2 && $textArray[4] == 1){
            echo "END पता: वन स्टॉप सेंटर, वार्ड नंबर 11 और 12, स्टाफ सिक रूम के निकट, द्वितीय तल, सरकार। सामान्य अस्पताल, माहे फोन नंबर: 0490-2332960, 0490-2336700";
        }elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 2 && $textArray[4] == 2){
            echo "END पता: वन स्टॉप सेंटर, वार्ड नंबर 11 और 12, स्टाफ सिक रूम के निकट, द्वितीय तल, सरकार। सामान्य अस्पताल, माहे फोन नंबर: 0490-2332960, 0490-2336700";
        }elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 2 && $textArray[4] == 3){
            echo "END पता: वन स्टॉप सेंटर, वार्ड नंबर 11 और 12, स्टाफ सिक रूम के निकट, द्वितीय तल, सरकार। सामान्य अस्पताल, माहे फोन नंबर: 0490-2332960, 0490-2336700";
        }elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 2 && $textArray[4] == 4){
            echo "END पता: वन स्टॉप सेंटर, वार्ड नंबर 11 और 12, स्टाफ सिक रूम के निकट, द्वितीय तल, सरकार। सामान्य अस्पताल, माहे फोन नंबर: 0490-2332960, 0490-2336700";
        }elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 2 && $textArray[4] == 5){
            echo "END पता: वन स्टॉप सेंटर, वार्ड नंबर 11 और 12, स्टाफ सिक रूम के निकट, द्वितीय तल, सरकार। सामान्य अस्पताल, माहे फोन नंबर: 0490-2332960, 0490-2336700";
        }
        
        
        elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 3 && $textArray[4] == 1){
            echo "END पता: वन स्टॉप सेंटर, राजीव गांधी अस्पताल, 100 फीट रोड, एल्लाईपिल्लईचावडी, पुडुचेरी\n फोन नंबर: 0413-2244964, 9842349918, 9894132392";
        }elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 3 && $textArray[4] == 2){
            echo "END पता: वन स्टॉप सेंटर, राजीव गांधी अस्पताल, 100 फीट रोड, एल्लाईपिल्लईचावडी, पुडुचेरी\n फोन नंबर: 0413-2244964, 9842349918, 9894132392";
        }elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 3 && $textArray[4] == 3){
            echo "END पता: वन स्टॉप सेंटर, राजीव गांधी अस्पताल, 100 फीट रोड, एल्लाईपिल्लईचावडी, पुडुचेरी\n फोन नंबर: 0413-2244964, 9842349918, 9894132392";
        }elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 3 && $textArray[4] == 4){
            echo "END पता: वन स्टॉप सेंटर, राजीव गांधी अस्पताल, 100 फीट रोड, एल्लाईपिल्लईचावडी, पुडुचेरी\n फोन नंबर: 0413-2244964, 9842349918, 9894132392";
        }elseif($level == 5 && $textArray[2] == 6 && $textArray[3] == 3 && $textArray[4] == 5){
            echo "END पता: वन स्टॉप सेंटर, राजीव गांधी अस्पताल, 100 फीट रोड, एल्लाईपिल्लईचावडी, पुडुचेरी\n फोन नंबर: 0413-2244964, 9842349918, 9894132392";
        }
        // Puducherry ends here
            
            
            // Sikkim start here

        elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 1 && $textArray[4] == 1){
            echo "END पता: वन स्टॉप सेंटर, लुम्सी, 5 माइल, ताडोंग, गंगटोक जिला, सिक्किम\n फोन नंबर: 9434188310, 0359-2280100";
        }elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 1 && $textArray[4] == 2){
            echo "END पता: वन स्टॉप सेंटर, लुम्सी, 5 माइल, ताडोंग, गंगटोक जिला, सिक्किम\n फोन नंबर: 9434188310, 0359-2280100";
        }elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 1 && $textArray[4] == 3){
            echo "END पता: वन स्टॉप सेंटर, लुम्सी, 5 माइल, ताडोंग, गंगटोक जिला, सिक्किम\n फोन नंबर: 9434188310, 0359-2280100";
        }elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 1 && $textArray[4] == 4){
            echo "END पता: वन स्टॉप सेंटर, लुम्सी, 5 माइल, ताडोंग, गंगटोक जिला, सिक्किम\n फोन नंबर: 9434188310, 0359-2280100";
        }elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 1 && $textArray[4] == 5){
            echo "END पता: वन स्टॉप सेंटर, लुम्सी, 5 माइल, ताडोंग, गंगटोक जिला, सिक्किम\n फोन नंबर: 9434188310, 0359-2280100";
        }
        
        
        elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 2 && $textArray[4] == 1){
            echo "END पता: वन स्टॉप सेंटर, आयुष अस्पताल, क्योंगसा ग्राउंड के नीचे, ग्यालसिंह, पश्चिम सिक्किम -737111 फोन नंबर: 9647490507";
        }elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 2 && $textArray[4] == 2){
            echo "END पता: वन स्टॉप सेंटर, आयुष अस्पताल, क्योंगसा ग्राउंड के नीचे, ग्यालसिंह, पश्चिम सिक्किम -737111 फोन नंबर: 9647490507";
        }elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 2 && $textArray[4] == 3){
            echo "END पता: वन स्टॉप सेंटर, आयुष अस्पताल, क्योंगसा ग्राउंड के नीचे, ग्यालसिंह, पश्चिम सिक्किम -737111 फोन नंबर: 9647490507";
        }elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 2 && $textArray[4] == 4){
            echo "END पता: वन स्टॉप सेंटर, आयुष अस्पताल, क्योंगसा ग्राउंड के नीचे, ग्यालसिंह, पश्चिम सिक्किम -737111 फोन नंबर: 9647490507";
        }elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 2 && $textArray[4] == 5){
            echo "END पता: वन स्टॉप सेंटर, आयुष अस्पताल, क्योंगसा ग्राउंड के नीचे, ग्यालसिंह, पश्चिम सिक्किम -737111 फोन नंबर: 9647490507";
        }
        
        
        elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 3 && $textArray[4] == 1){
            echo "END पता: वन स्टॉप सेंटर, मंगन जिला अस्पताल के पास, मंगन, उत्तरी सिक्किम 737116\n फोन नंबर: 86705539777";
        }elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 3 && $textArray[4] == 2){
            echo "END पता: वन स्टॉप सेंटर, मंगन जिला अस्पताल के पास, मंगन, उत्तरी सिक्किम 737116\n फोन नंबर: 86705539777";
        }elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 3 && $textArray[4] == 3){
            echo "END पता: वन स्टॉप सेंटर, मंगन जिला अस्पताल के पास, मंगन, उत्तरी सिक्किम 737116\n फोन नंबर: 86705539777";
        }elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 3 && $textArray[4] == 4){
            echo "END पता: वन स्टॉप सेंटर, मंगन जिला अस्पताल के पास, मंगन, उत्तरी सिक्किम 737116\n फोन नंबर: 86705539777";
        }elseif($level == 5 && $textArray[2] == 7 && $textArray[3] == 3 && $textArray[4] == 5){
            echo "END पता: वन स्टॉप सेंटर, मंगन जिला अस्पताल के पास, मंगन, उत्तरी सिक्किम 737116\n फोन नंबर: 86705539777";
        }
        // Sikkim ends here
            
            
            // Tripura start here

        elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 1 && $textArray[4] == 1){
            echo "END पता: वन स्टॉप सेंटर, आंगनवाड़ी प्रशिक्षण केंद्र, कुलई, धलाई-7992014\n फोन नंबर: 9434188310, 0359-2280100";
        }elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 1 && $textArray[4] == 2){
            echo "END पता: वन स्टॉप सेंटर, आंगनवाड़ी प्रशिक्षण केंद्र, कुलई, धलाई-7992014\n फोन नंबर: 9434188310, 0359-2280100";
        }elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 1 && $textArray[4] == 3){
            echo "END पता: वन स्टॉप सेंटर, आंगनवाड़ी प्रशिक्षण केंद्र, कुलई, धलाई-7992014\n फोन नंबर: 9434188310, 0359-2280100";
        }elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 1 && $textArray[4] == 4){
            echo "END पता: वन स्टॉप सेंटर, आंगनवाड़ी प्रशिक्षण केंद्र, कुलई, धलाई-7992014\n फोन नंबर: 9434188310, 0359-2280100";
        }elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 1 && $textArray[4] == 5){
            echo "END पता: वन स्टॉप सेंटर, आंगनवाड़ी प्रशिक्षण केंद्र, कुलई, धलाई-7992014\n फोन नंबर: 9434188310, 0359-2280100";
        }
        
        
        elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 2 && $textArray[4] == 1){
            echo "END पता: वन स्टॉप सेंटर, पीडब्ल्यूडी कॉम्प्लेक्स ओ / ओ डीएम और कलेक्टर, खोवाई जिला -799201 के पास फोन नंबर: 9612428092";
        }elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 2 && $textArray[4] == 2){
            echo "END पता: वन स्टॉप सेंटर, पीडब्ल्यूडी कॉम्प्लेक्स ओ / ओ डीएम और कलेक्टर, खोवाई जिला -799201 के पास फोन नंबर: 9612428092";
        }elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 2 && $textArray[4] == 3){
            echo "END पता: वन स्टॉप सेंटर, पीडब्ल्यूडी कॉम्प्लेक्स ओ / ओ डीएम और कलेक्टर, खोवाई जिला -799201 के पास फोन नंबर: 9612428092";
        }elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 2 && $textArray[4] == 4){
            echo "END पता: वन स्टॉप सेंटर, पीडब्ल्यूडी कॉम्प्लेक्स ओ / ओ डीएम और कलेक्टर, खोवाई जिला -799201 के पास फोन नंबर: 9612428092";
        }elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 2 && $textArray[4] == 5){
            echo "END पता: वन स्टॉप सेंटर, पीडब्ल्यूडी कॉम्प्लेक्स ओ / ओ डीएम और कलेक्टर, खोवाई जिला -799201 के पास फोन नंबर: 9612428092";
        }
        
        
        elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 3 && $textArray[4] == 1){
            echo "END पता: वन स्टॉप सेंटर, जिला अस्पताल, उत्तरी त्रिपुरा, धर्मनगर -799250, उत्तरी त्रिपुरा\n फोन नंबर: 03822220030";
        }elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 3 && $textArray[4] == 2){
            echo "END पता: वन स्टॉप सेंटर, जिला अस्पताल, उत्तरी त्रिपुरा, धर्मनगर -799250, उत्तरी त्रिपुरा\n फोन नंबर: 03822220030";
        }elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 3 && $textArray[4] == 3){
            echo "END पता: वन स्टॉप सेंटर, जिला अस्पताल, उत्तरी त्रिपुरा, धर्मनगर -799250, उत्तरी त्रिपुरा\n फोन नंबर: 03822220030";
        }elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 3 && $textArray[4] == 4){
            echo "END पता: वन स्टॉप सेंटर, जिला अस्पताल, उत्तरी त्रिपुरा, धर्मनगर -799250, उत्तरी त्रिपुरा\n फोन नंबर: 03822220030";
        }elseif($level == 5 && $textArray[2] == 8 && $textArray[3] == 3 && $textArray[4] == 5){
            echo "END पता: वन स्टॉप सेंटर, जिला अस्पताल, उत्तरी त्रिपुरा, धर्मनगर -799250, उत्तरी त्रिपुरा\n फोन नंबर: 03822220030";
        }
        // Tripura ends here
            
            
            // Rajasthan start here

        elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 1 && $textArray[4] == 1){
            echo "END पता:राज लोक सेवा आयोग, अजमेर\n फोन नंबर: 0145-2627154, 01452627155";
        }elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 1 && $textArray[4] == 2){
            echo "END पता:राज लोक सेवा आयोग, अजमेर\n फोन नंबर: 0145-2627154, 01452627155";
        }elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 1 && $textArray[4] == 3){
            echo "END पता:राज लोक सेवा आयोग, अजमेर\n फोन नंबर: 0145-2627154, 01452627155";
        }elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 1 && $textArray[4] == 4){
            echo "END पता:राज लोक सेवा आयोग, अजमेर\n फोन नंबर: 0145-2627154, 01452627155";
        }elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 1 && $textArray[4] == 5){
            echo "END पता:राज लोक सेवा आयोग, अजमेर\n फोन नंबर: 0145-2627154, 01452627155";
        }
        
        
        elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 2 && $textArray[4] == 1){
            echo "END पता: वन स्टॉप सेंटर, कमरा नंबर 10,11, पहली मंजिल, मातृ एवं शिशु स्वास्थ्य भवन, जिला अस्पताल, बारां, बारां जिला, राजस्थान फोन नंबर: 9828141425";
        }elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 2 && $textArray[4] == 2){
            echo "END पता: वन स्टॉप सेंटर, कमरा नंबर 10,11, पहली मंजिल, मातृ एवं शिशु स्वास्थ्य भवन, जिला अस्पताल, बारां, बारां जिला, राजस्थान फोन नंबर: 9828141425";
        }elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 2 && $textArray[4] == 3){
            echo "END पता: वन स्टॉप सेंटर, कमरा नंबर 10,11, पहली मंजिल, मातृ एवं शिशु स्वास्थ्य भवन, जिला अस्पताल, बारां, बारां जिला, राजस्थान फोन नंबर: 9828141425";
        }elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 2 && $textArray[4] == 4){
            echo "END पता: वन स्टॉप सेंटर, कमरा नंबर 10,11, पहली मंजिल, मातृ एवं शिशु स्वास्थ्य भवन, जिला अस्पताल, बारां, बारां जिला, राजस्थान फोन नंबर: 9828141425";
        }elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 2 && $textArray[4] == 5){
            echo "END पता: वन स्टॉप सेंटर, कमरा नंबर 10,11, पहली मंजिल, मातृ एवं शिशु स्वास्थ्य भवन, जिला अस्पताल, बारां, बारां जिला, राजस्थान फोन नंबर: 9828141425";
        }
        
        
        elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 3 && $textArray[4] == 1){
            echo "END पता:नगर निगम आश्रय स्थल, जिला अस्पताल कैंपपुर, भरतपुर-321001\n फोन नंबर: 03822220030";
        }elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 3 && $textArray[4] == 2){
            echo "END पता:नगर निगम आश्रय स्थल, जिला अस्पताल कैंपपुर, भरतपुर-321001\n फोन नंबर: 03822220030";
        }elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 3 && $textArray[4] == 3){
            echo "END पता:नगर निगम आश्रय स्थल, जिला अस्पताल कैंपपुर, भरतपुर-321001\n फोन नंबर: 03822220030";
        }elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 3 && $textArray[4] == 4){
            echo "END पता:नगर निगम आश्रय स्थल, जिला अस्पताल कैंपपुर, भरतपुर-321001\n फोन नंबर: 03822220030";
        }elseif($level == 5 && $textArray[2] == 9 && $textArray[3] == 3 && $textArray[4] == 5){
            echo "END पता:नगर निगम आश्रय स्थल, जिला अस्पताल कैंपपुर, भरतपुर-321001\n फोन नंबर: 03822220030";
        }
        // Rajasthan ends here
    }
    
    
}
?>