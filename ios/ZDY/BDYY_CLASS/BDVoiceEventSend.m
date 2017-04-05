//
//  BD_Voice_EventSend.m
//  ZDY
//
//  Created by MrChen on 17/3/31.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "BDVoiceEventSend.h"

@interface BDVoiceEventSend()

@end

@implementation BDVoiceEventSend
 
- (NSArray<NSString *> *)supportedEvents
{
  return @[@"BD_Voice_Event"];//初始化代理事件
}

-(void)iseCallback:(NSString*)code bridge:(RCTBridge*) bridge
{
  self.bridge = bridge;
  
  [self sendEventWithName:@"BD_Voice_Event"
                     body:@{
                            @"BDVoiceKey": code,
                            }];
}
@end
