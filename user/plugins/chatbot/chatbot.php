<?php
namespace Grav\Plugin;

use Grav\Common\Plugin;
use RocketTheme\Toolbox\Event\Event;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
/**
 * Class ChatbotPlugin
 * @package Grav\Plugin
 */
class ChatbotPlugin extends Plugin
{
    /**
     * Register plugin events.
     */
    public static function getSubscribedEvents()
    {
        return [
            'onPluginsInitialized' => ['initialize', 0]
        ];
    }

    /**
     * Initialize the plugin.
     */
    public function initialize()
    {
        if ($this->isAdmin()) {
            return;
        }

        $this->enable([
            'onPageInitialized' => ['handleAiBotRequest', 0]
        ]);
    }

 /**
 * Handle AI bot request.
 */
public function handleAiBotRequest(Event $event)
{
    // Check if the request method is POST
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Dynamically retrieve query parameters from the URL
        $params = $_GET;
        foreach ($params as $key => $value) {
            $$key = isset($_GET[$key]) ? $_GET[$key] : '';
        }
    
        // Get the request body as JSON
        $body = file_get_contents('php://input');
        $data = json_decode($body, true); // Decode JSON string into associative array
    
        // Check if the request data contains the 'message' key
        if (isset($data['message'])) {
            // Get the message from the request data
            $message = strtolower($data['message']); // Convert message to lowercase for case-insensitive matching
    
            // Construct the API URL using the parameters from the URL
            $apiUrl =  $this->grav['config']->get('plugins.chatbot.api_url')  . '?' . http_build_query($params);
    
            // Determine response based on the keyword
            switch ($message) {
                case 'hi':
                case 'hello':
                    $response = [
                        'status' => 'success',
                        'message' => 'Hello! How can I assist you?',
                        'url' => $apiUrl
                    ];
                    break;
                case 'bye':
                    $response = [
                        'status' => 'success',
                        'message' => 'Goodbye! Have a great day!',
                        'url' => $apiUrl
                    ];
                    break;
                case 'what is the weather like today?':
                    $response=[
                        'status'=>'success',
                        'message'=> "It's looks like strong gusty winds ",
                        'url' => $apiUrl
                    ];
                    break;
                case "what is your favorite book?":
                    $response=[
                        'status'=>'success',
                        'message'=> "I don't have personal preferences, but I can recommend some popular books",
                        'url' => $apiUrl
                    ];
                    break;
                default:
                    $response = [
                        'status' => 'error',
                        'message' => 'Sorry, I didn\'t understand that.'
                    ];
                    break;
            }
    
            // Send the response as JSON
            header('Content-Type: application/json');
            echo json_encode($response);
            exit(); // Stop further processing
        }
    }
    
}
}