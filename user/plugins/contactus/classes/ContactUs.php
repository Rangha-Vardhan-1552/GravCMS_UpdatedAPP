<?php
namespace Grav\Plugin;

class ContactUs
{
    public static function getData()
    {
        $file = DATA_DIR . 'contactus/data.json';
        if (file_exists($file)) {
            $content = file_get_contents($file);
            return json_decode($content, true);
        }
        return [];
    }
}
