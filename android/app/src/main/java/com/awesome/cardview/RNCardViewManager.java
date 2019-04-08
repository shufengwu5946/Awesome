package com.awesome.cardview;

import android.support.v7.widget.CardView;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

import javax.annotation.Nonnull;

public class RNCardViewManager extends ViewGroupManager<CardView> {

    private ThemedReactContext mContext;

    @Nonnull
    @Override
    public String getName() {
        return "RNCardView";
    }

    @Nonnull
    @Override
    protected CardView createViewInstance(@Nonnull ThemedReactContext reactContext) {
        this.mContext = reactContext;
        CardView cardView = new CardView(reactContext);
        return cardView;
    }
}
