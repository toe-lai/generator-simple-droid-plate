package com.toelie.tools.littdroidtemplate.template;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import com.toelie.tools.littdroidtemplate.R;
import com.toelie.tools.littdroidtemplate.util.ActivityUtils;


/**
 * Created by toe-lie on 3/6/2017.
 */

public class TemplateActivity extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.template_act);

        // Setup toolbar
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        if (savedInstanceState == null) {
            ActivityUtils
                .addFragmentToActivity(getSupportFragmentManager(), TemplateFragment.newInstance(), R.id.contentFrame);
        }
    }
}
