//
//  ViewController.h
//  BDYY_DD
//
//  Created by MrChen on 17/3/29.
//  Copyright © 2017年 CHENLEIJING. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "BDRecognizerViewController.h"
#import "BDRecognizerViewDelegate.h"
#import "BDVRFileRecognizer.h"
#import "BDVRDataUploader.h"
#import "RCTBridgeModule.h"
#import "RCTLog.h"

@interface BDVoiceVC : NSObject <
    BDRecognizerViewDelegate,
    MVoiceRecognitionClientDelegate,
    RCTBridgeModule
>
@property (nonatomic, retain) BDRecognizerViewController *recognizerViewController; 
@property (nonatomic,copy)NSString *BDVoiceStr;//接受语音结果的Str
 
@end

