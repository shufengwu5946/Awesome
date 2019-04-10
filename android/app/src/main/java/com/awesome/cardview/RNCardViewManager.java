package com.awesome.cardview;

import android.graphics.Color;
import android.support.v7.widget.CardView;

import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

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

    @ReactProp(name = "paddingLeft", defaultFloat = 0f)
    public void setPaddingLeft(CardView view, float left) {
        view.setContentPadding((int) PixelUtil.toPixelFromDIP(left), view.getContentPaddingTop(), view.getContentPaddingRight(), view.getContentPaddingBottom());
    }

    @ReactProp(name = "paddingTop", defaultFloat = 0f)
    public void setPaddingTop(CardView view, float top) {
        view.setContentPadding(view.getContentPaddingLeft(), (int) PixelUtil.toPixelFromDIP(top), view.getContentPaddingRight(), view.getContentPaddingBottom());
    }

    @ReactProp(name = "paddingRight", defaultFloat = 0f)
    public void setPaddingRight(CardView view, float right) {
        view.setContentPadding(view.getContentPaddingLeft(), view.getContentPaddingTop(), (int) PixelUtil.toPixelFromDIP(right), view.getContentPaddingBottom());
    }

    @ReactProp(name = "paddingBottom", defaultFloat = 0f)
    public void setPaddingBottom(CardView view, float bottom) {
        view.setContentPadding(view.getContentPaddingLeft(), view.getContentPaddingTop(), view.getContentPaddingRight(), (int) PixelUtil.toPixelFromDIP(bottom));
    }

    @ReactProp(name = "minimumWidth", defaultFloat = 0f)
    public void setMinimumWidth(CardView view, float minWidth) {
        view.setMinimumWidth((int) PixelUtil.toPixelFromDIP(minWidth));
    }

    @ReactProp(name = "minimumHeight", defaultFloat = 0f)
    public void setMinimumHeight(CardView view, float minHeight) {
        view.setMinimumHeight((int) PixelUtil.toPixelFromDIP(minHeight));
    }

    @ReactProp(name = "cardBackgroundColor")
    public void setCardBackgroundColor(CardView view, String color) {
        view.setCardBackgroundColor(Color.parseColor(color));
    }

    @ReactProp(name = "radius", defaultFloat = 0f)
    public void setRadius(CardView view, float radius) {
        view.setRadius(PixelUtil.toPixelFromDIP(radius));
    }

    @ReactProp(name = "cardElevation", defaultFloat = 0f)
    public void setCardElevation(CardView view, float elevation) {
        view.setCardElevation(PixelUtil.toPixelFromDIP(elevation));
    }

}
