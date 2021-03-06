// Written by Jürgen Moßgraber - mossgrabers.de
// (c) 2014-2016
// Licensed under LGPLv3 - http://www.gnu.org/licenses/lgpl-3.0.txt

load ("framework/core/AbstractConfig.js");

// ------------------------------
// Static configurations
// ------------------------------

// Inc/Dec of knobs
Config.fractionValue     = 1;
Config.fractionMinValue  = 0.5;
Config.maxParameterValue = 128;


// ------------------------------
// Editable configurations
// ------------------------------

Config.RECEIVE_HOST          = 20;
Config.RECEIVE_PORT          = 21;
Config.SEND_HOST             = 22;
Config.SEND_PORT             = 23;
Config.ACTIVATE_FIXED_ACCENT = 24;
Config.FIXED_ACCENT_VALUE    = 25;
Config.ENABLE_VU_METERS      = 26;

Config.receiveHost       = '127.0.0.1';
Config.receivePort       = 8000;
Config.sendHost          = '127.0.0.1';
Config.sendPort          = 9000;
Config.accentActive      = false;                       // Accent button active
Config.fixedAccentValue  = 127;                         // Fixed velocity value for accent

Config.initListeners (Config.ENABLE_VU_METERS);


Config.init = function ()
{
    var prefs = host.getPreferences ();

    ///////////////////////////
    // Network

    Config.receiveHostSetting = prefs.getStringSetting ('Host', 'Receive from (Script restart required)', 15, '127.0.0.1');
    Config.receiveHostSetting.addValueObserver (function (value)
    {
        Config.receiveHost = value;
        Config.notifyListeners (Config.RECEIVE_HOST);
    });
    
    Config.receivePortSetting = prefs.getNumberSetting ('Port', 'Receive from (Script restart required)', 0, 65535, 1, '', 8000);
    Config.receivePortSetting.addRawValueObserver (function (value)
    {
        Config.receivePort = Math.floor (value);
        Config.notifyListeners (Config.RECEIVE_PORT);
    });
    
    Config.sendHostSetting = prefs.getStringSetting ('Host', 'Send to', 15, '127.0.0.1');
    Config.sendHostSetting.addValueObserver (function (value)
    {
        Config.sendHost = value;
        Config.notifyListeners (Config.SEND_HOST);
    });
    
    Config.sendPortSetting = prefs.getNumberSetting ('Port', 'Send to', 0, 65535, 1, '', 9000);
    Config.sendPortSetting.addRawValueObserver (function (value)
    {
        Config.sendPort = Math.floor (value);
        Config.notifyListeners (Config.SEND_PORT);
    });
    
    ///////////////////////////
    // Accent

    Config.accentActiveSetting = prefs.getEnumSetting ("Activate Fixed Accent", "Fixed Accent", [ "Off", "On" ], "Off");
    Config.accentActiveSetting.addValueObserver (function (value)
    {
        Config.accentActive = value == "On";
        Config.notifyListeners (Config.ACTIVATE_FIXED_ACCENT);
    });
    
    Config.accentValueSetting = prefs.getNumberSetting ("Fixed Accent Value", "Fixed Accent", 1, 127, 1, "", 127);
    Config.accentValueSetting.addRawValueObserver (function (value)
    {
        Config.fixedAccentValue = value;
        Config.notifyListeners (Config.FIXED_ACCENT_VALUE);
    });
    
    ///////////////////////////
    // Workflow

    Config.activateEnableVUMetersSetting (prefs);    
};

Config.setAccentEnabled = function (enabled)
{
    Config.accentActiveSetting.set (enabled ? "On" : "Off");
};

Config.setAccentValue = function (value)
{
    Config.accentValueSetting.setRaw (value);
};
