package com.awesome;

import android.support.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class NaviBar {
    public static ReactContext myContext;

    public  void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params)
    {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName,params);
    }

    public  void send()
    {
//        new Thread(() -> {
//            try {
//                Thread.sleep(100);
//            } catch (InterruptedException e) {
//                e.printStackTrace();
//            }
//
//        }).start();
        WritableMap et= Arguments.createMap();
        sendEvent(myContext,"WillShow",et);
    }
}
