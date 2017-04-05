//
//  BD_Voice_EventSend.h
//  ZDY
//
//  Created by MrChen on 17/3/31.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTEventEmitter.h" 
@interface BDVoiceEventSend : RCTEventEmitter <RCTBridgeModule>
-(void)iseCallback:(NSString*)code bridge:(RCTBridge*) bridge;
@end
