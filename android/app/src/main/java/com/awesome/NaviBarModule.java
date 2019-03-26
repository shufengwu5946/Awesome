package com.awesome;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import javax.annotation.Nonnull;

public class NaviBarModule extends ReactContextBaseJavaModule {
    public NaviBarModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        NaviBar.myContext = reactContext;
    }

    @Nonnull
    @Override
    public String getName() {
        return "NaviBarModule";
    }
}
