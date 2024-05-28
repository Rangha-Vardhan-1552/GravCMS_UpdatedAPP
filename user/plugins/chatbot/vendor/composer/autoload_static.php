<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitce87dc0639684298f07a1f2625a2829a
{
    public static $prefixLengthsPsr4 = array (
        'G' => 
        array (
            'Grav\\Plugin\\Chatbot\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Grav\\Plugin\\Chatbot\\' => 
        array (
            0 => __DIR__ . '/../..' . '/classes',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
        'Grav\\Plugin\\ChatbotPlugin' => __DIR__ . '/../..' . '/chatbot.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitce87dc0639684298f07a1f2625a2829a::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitce87dc0639684298f07a1f2625a2829a::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitce87dc0639684298f07a1f2625a2829a::$classMap;

        }, null, ClassLoader::class);
    }
}