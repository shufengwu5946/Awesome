package com.awesome;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.ViewTreeObserver;
import android.widget.FrameLayout;
import android.widget.Toast;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity implements ViewTreeObserver.OnGlobalLayoutListener {

    FrameLayout content;
    private boolean mLayoutComplete = false;
    int rootViewHeight = 0;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Awesome";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        content = findViewById(android.R.id.content);
        content.post(() -> mLayoutComplete = true);
        content.getViewTreeObserver().addOnGlobalLayoutListener(this);
    }

    @Override
    public void onGlobalLayout() {
        if (!mLayoutComplete)
            return;

        int viewHeight = content.getHeight();
        if (rootViewHeight != viewHeight) {
            rootViewHeight = viewHeight;
            onNavigationBarStatusChanged();
        }

    }


    private void onNavigationBarStatusChanged() {
//        Toast.makeText(this, "daohang", Toast.LENGTH_SHORT).show();
        if (NaviBar.myContext != null) {
            new NaviBar().send();
        }

    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        content.getViewTreeObserver().removeOnGlobalLayoutListener(this);
    }

}
