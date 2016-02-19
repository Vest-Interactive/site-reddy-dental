<?php
/**
 * AJAX :
 * author @andrew
 * - Add the fields into the database, respond with email to rep.
 */

if(isset($_POST) && isset($_POST['contact'])) {

	$contact = json_decode($_POST['contact'], true);

	if (!isset($contact['action'])) {
		echo json_encode(array('success' => 0));
		exit;
	}

	if($contact['action'] == "contact") {


			$newMessage = '<table cellpadding="0" cellspacing="0" border="0" align="center" width="600" height="35">'.
						  '<tbody><tr>'.
						  '<td style="font-size: 18px; font-weight: strong;"> Reddy-Dental.com - Contact Request</td>'.
						  '</tr></tbody>'.
						  '</table>'.
						  '<table cellpadding="0" cellspacing="0" border="0" align="center" width="600">'.
						  '<tbody><tr>'.
						  '<td width="175"> Name </td>'.
						  '<td width="525">: '.$contact['name'].'</td>'.
						  '</tr>'.
						  '<tr>'.
						  '<td width="175"> Phone </td>'.
						  '<td width="525">: '.$contact['phone'].'</td>'.
						  '</tr>'.
						  '<tr>'.
						  '<td width="175"> Email </td>'.
						  '<td width="525">: '.$contact['email'].'</td>'.
						  '</tr>'.
						  '<tr>'.
						  '<td width="175"> Contact Preference </td>'.
						  '<td width="525">: '.$contact['preference'].'</td>'.
						  '</tr>'.
						  '<tr>'.
						  '<td width="175"> Created On </td>'.
						  '<td width="525">: '.date("F j, Y, g:i a").'</td>'.
						  '</tr></tbody>'.
						  '</table>';
			$headers = "MIME-Version: 1.0" . "\r\n";
			$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
			$headers .= 'From: no-reply@reddy-dental.com' . "\r\n";
			$result = mail('reddydmd@yahoo.com', '[reddy-dental.com] Contact Request', $newMessage, $headers);			

			if($result) {
				echo json_encode(array( "success" => 1, "code" => 1));
			} else {
				echo json_encode(array( "success" => 1, "code" => 2));
			}

		}


	}
?>