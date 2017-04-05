//
//  ViewController.m
//  BDYY_DD
//
//  Created by MrChen on 17/3/29.
//  Copyright © 2017年 CHENLEIJING. All rights reserved.
//

#import "BDVoiceVC.h"
#import "BDVoiceRecognitionClient.h"
#import "BDVRSConfig.h" 
#import "BDVRLogger.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"
#import "BDVoiceEventSend.h"
#define BDORGINX  ([UIScreen mainScreen].bounds.size.width-302.0)/2.0
#define BDORGINY  ([UIScreen mainScreen].bounds.size.height-352.0)/2.0



@interface BDVoiceVC ()

@end

@implementation BDVoiceVC


RCT_EXPORT_MODULE();
// 接收传过来的 NSString
RCT_EXPORT_METHOD(BDCallVoice:(NSString *)BD_API_KEY :(NSString*)BD_SECRET_KEY) {
  dispatch_async(dispatch_get_main_queue(), ^{
    [self initWithBDYYUI:BD_API_KEY BD_SECRET_KEY:BD_SECRET_KEY];
  });
 
}
@synthesize bridge = _bridge;

-(void)iseCallback:(NSString*)BDVoiceStr
{
  [_bridge.eventDispatcher
   sendDeviceEventWithName:@"BD_Voice_Event"
   body:@{@"BDVoiceKey":BDVoiceStr}];
  
//  BDVoiceEventSend *bd = [[BDVoiceEventSend alloc]init];
//  
//  [bd iseCallback:@"s" bridge:_bridge];
  
}

-(void)initWithBDYYUI :(NSString*)BD_API_KEY BD_SECRET_KEY:(NSString*)BD_SECRET_KEY{
    // 创建识别控件
    BDRecognizerViewController *tmpRecognizerViewController = [[BDRecognizerViewController alloc] initWithOrigin:CGPointMake(BDORGINX, BDORGINY) withTheme:[BDVRSConfig sharedInstance].theme];
  
    // 全屏UI
    if ([[BDVRSConfig sharedInstance].theme.name isEqualToString:@"全屏亮蓝"]) {
        tmpRecognizerViewController.enableFullScreenMode = YES;
    }
    
    tmpRecognizerViewController.delegate = self;
    self.recognizerViewController = tmpRecognizerViewController;
    
    // 设置识别参数
    BDRecognizerViewParamsObject *paramsObject = [[BDRecognizerViewParamsObject alloc] init];
    
    // 开发者信息，必须修改API_KEY和SECRET_KEY为在百度开发者平台申请得到的值，否则示例不能工作
    paramsObject.apiKey = BD_API_KEY;
    paramsObject.secretKey = BD_SECRET_KEY;
    
    // 设置是否需要语义理解，只在搜索模式有效
    paramsObject.isNeedNLU = [BDVRSConfig sharedInstance].isNeedNLU;
    
    // 设置识别语言
    paramsObject.language = [BDVRSConfig sharedInstance].recognitionLanguage;
    
    // 设置识别模式，分为搜索和输入
    paramsObject.recogPropList = @[[BDVRSConfig sharedInstance].recognitionProperty];
    
    // 设置城市ID，当识别属性包含EVoiceRecognitionPropertyMap时有效
    paramsObject.cityID = 1;
    
    // 开启联系人识别
    //    paramsObject.enableContacts = YES;
    
    // 设置显示效果，是否开启连续上屏
    if ([BDVRSConfig sharedInstance].resultContinuousShow)
    {
        paramsObject.resultShowMode = BDRecognizerResultShowModeContinuousShow;
    }
    else
    {
        paramsObject.resultShowMode = BDRecognizerResultShowModeWholeShow;
    }
    
    // 设置提示音开关，是否打开，默认打开
    if ([BDVRSConfig sharedInstance].uiHintMusicSwitch)
    {
        paramsObject.recordPlayTones = EBDRecognizerPlayTonesRecordPlay;
    }
    else
    {
        paramsObject.recordPlayTones = EBDRecognizerPlayTonesRecordForbidden;
    }
    
    //Test uncertain:
    [[BDVoiceRecognitionClient sharedInstance] setProductId:@"790"];
    paramsObject.isNeedOriginJsonResult = YES;
    
    paramsObject.isShowTipAfterSilence = NO;
    paramsObject.isShowHelpButtonWhenSilence = YES;
//    paramsObject.tipsTitle = @"可以使用如下指令记账";
//    paramsObject.tipsList = [NSArray arrayWithObjects:@"我要记账", @"买苹果花了十块钱", @"买牛奶五块钱", @"第四行滚动后可见", @"第五行是最后一行", nil];
  
    [_recognizerViewController startWithParams:paramsObject];

}



- (void)onEndWithViews:(BDRecognizerViewController *)aBDRecognizerView withResults:(NSArray *)aResults
{
    _BDVoiceStr = [NSString new];
  
    if ([[BDVoiceRecognitionClient sharedInstance] getRecognitionProperty] != EVoiceRecognitionPropertyInput)
    {
        // 搜索模式下的结果为数组，示例为
        // ["公园", "公元"]
        NSMutableArray *audioResultData = (NSMutableArray *)aResults;
        NSMutableString *tmpString = [[NSMutableString alloc] initWithString:@""];
        
        for (int i=0; i < [audioResultData count]; i++)
        {
            [tmpString appendFormat:@"%@\r\n",[audioResultData objectAtIndex:i]];
        }
        
        _BDVoiceStr = [_BDVoiceStr stringByAppendingString:tmpString];
        _BDVoiceStr = [_BDVoiceStr stringByAppendingString:@"\n"];
         
    }
    else
    {
        NSString *tmpString = [[BDVRSConfig sharedInstance] composeInputModeResult:aResults];
        
        _BDVoiceStr = [_BDVoiceStr stringByAppendingString:tmpString];
        _BDVoiceStr = [_BDVoiceStr stringByAppendingString:@"\n"];
    }
    [self iseCallback:_BDVoiceStr];
}

 
@end
