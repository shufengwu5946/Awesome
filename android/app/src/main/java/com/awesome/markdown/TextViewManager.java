package com.awesome.markdown;

import android.view.ViewGroup;
import android.widget.TextView;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.zzhoujay.richtext.RichText;

import javax.annotation.Nonnull;

public class TextViewManager extends SimpleViewManager<TextView> {

    private ThemedReactContext mContext;
    private static final String MARKDOWN_MANAGER_NAME = "Markdown";

    @Nonnull
    @Override
    public String getName() {
        return MARKDOWN_MANAGER_NAME;
    }

    @Nonnull
    @Override
    protected TextView createViewInstance(@Nonnull ThemedReactContext reactContext) {
        this.mContext = reactContext;
        TextView textView = new TextView(reactContext);
        textView.setHeight(500);
        textView.setWidth(500);
        return textView;
    }

    @ReactProp(name = "content")
    public void setImageSrc(final TextView textView, String content) {
        RichText.fromMarkdown(content).into(textView);
    }
}
