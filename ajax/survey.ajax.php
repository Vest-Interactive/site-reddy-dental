<?php
/**
 * AJAX :
 * author @andrew
 * - Add the fields into the database, respond with email to rep.
 */

if(isset($_POST) && isset($_POST['survey'])) {

	$survey = json_decode($_POST['survey'], true);

	if (!isset($survey['action'])) {
		echo json_encode(array('success' => 0));
		exit;
	}

	if($survey['action'] == "survey") {


			$newMessage = '<table cellpadding="0" cellspacing="0" border="0" align="center" width="600" height="35">'.
						  '<tbody><tr>'.
						  '<td style="font-size: 18px; font-weight: strong;"> Reddy-Dental.com - Survey Submission</td>'.
						  '</tr></tbody>'.
						  '</table>'.
						  '<table cellpadding="0" cellspacing="0" border="0" align="center" width="600">'.
						  '<tbody><tr>'.
						  '<td width="475"> Were you greeted immediately when you arrived? </td>'.
						  '<td width="75">: '.$survey['1'].'</td>'.
						  '</tr>'.
						  '<tr>'.
						  '<td width="475"> Was the waiting area comfortable? </td>'.
						  '<td width="75">: '.$survey['2'].'</td>'.
						  '</tr>'.
						  '<tr>'.
						  '<td width="475"> Did staff adequately explain all information and instructions? </td>'.
						  '<td width="75">: '.$survey['3'].'</td>'.
						  '</tr>'.
						  '<tr>'.
						  '<td width="475"> Would you recommend Dr. Reddy to a friend or family member?</td>'.
						  '<td width="75">: '.$survey['4'].'</td>'.
						  '</tr>'.
						  '<tr>'.
						  '<td width="175"> Comments </td>'.
						  '<td width="525">: '.$survey['comment'].'</td>'.
						  '</tr>'.
						  '<tr>'.
						  '<td width="175"> Created On </td>'.
						  '<td width="525">: '.date("F j, Y, g:i a").'</td>'.
						  '</tr></tbody>'.
						  '</table>';
			$headers = "MIME-Version: 1.0" . "\r\n";
			$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
			$headers .= 'From: no-reply@reddy-dental.com' . "\r\n";
			$result = mail('reddydmd@yahoo.com', '[reddy-dental.com] Survey Submission', $newMessage, $headers);			

			if($result) {
				echo json_encode(array( "success" => 1, "code" => 1));
			} else {
				echo json_encode(array( "success" => 1, "code" => 2));
			}

		}


	}
?>