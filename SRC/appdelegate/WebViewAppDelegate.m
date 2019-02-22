//
//  AppDelegate.m
//  test
//
//  Created by yineng on 2018/8/7.
//  Copyright © 2018年 kupay. All rights reserved.
//

#import "WebViewAppDelegate.h"
#import "globolNavigationController.h"
#import "BaseObject.h"

@interface AppDelegate ()

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // 设置userAgent
    NSString *customizeUserAgent = @" YINENG_IOS/1.0";
    NSString *webViewUserAgent = [[UIWebView new] stringByEvaluatingJavaScriptFromString:@"navigator.userAgent"];
    customizeUserAgent = [webViewUserAgent stringByAppendingFormat:@" %@", customizeUserAgent];
    if (customizeUserAgent) {
        [[NSUserDefaults standardUserDefaults] registerDefaults:@{@"UserAgent": customizeUserAgent}];
    }
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];

    WebViewController *viewController = [WebViewController sharedInstence];
    globolNavigationController *navi = [[globolNavigationController alloc] initWithRootViewController:viewController];
    self.window.rootViewController = navi;
    [BaseObject setVc:navi];
    [self.window makeKeyAndVisible];
    [self initShareSDK];
    return YES;
}

/*
 * 初始化ShareSDK应用
 * 使用的分享平台集合
 * 导入回调处理，当某个平台的功能需要依赖原平台提供的SDK支持时，需要在此方法中对原平台SDK进行导入操作
 * 配置回调处理，在此方法中根据设置的platformType来填充应用配置信息
 */
- (void)initShareSDK {
    [ShareSDK registerActivePlatforms:@[
                    @(SSDKPlatformSubTypeWechatSession),
                    @(SSDKPlatformSubTypeWechatTimeline),
                    @(SSDKPlatformSubTypeQQFriend),
                    @(SSDKPlatformSubTypeQZone),
            ]
                             onImport:^(SSDKPlatformType platformType) {
                                 switch (platformType) {
                                     case SSDKPlatformTypeWechat:
                                         [ShareSDKConnector connectWeChat:[WXApi class]];
                                         break;
                                     case SSDKPlatformTypeQQ:
                                         [ShareSDKConnector connectQQ:[QQApiInterface class] tencentOAuthClass:[TencentOAuth class]];
                                         break;
                                     default:
                                         break;
                                 }
                             }
                      onConfiguration:^(SSDKPlatformType platformType, NSMutableDictionary *appInfo) {
                          switch (platformType) {
                              case SSDKPlatformTypeWechat:
                                  [appInfo SSDKSetupWeChatByAppId:@"wx3d86fc2e76c0af41"
                                                        appSecret:@"36fee1ab731a7bda68ae0b24b7d6bdb5"];
                                  break;
                              case SSDKPlatformTypeQQ:
                                  [appInfo SSDKSetupQQByAppId:@"1107928999"
                                                       appKey:@"iXtD1x0UZ60mpnkC"
                                                     authType:SSDKAuthTypeBoth];
                                  break;
                              default:
                                  break;
                          }
                      }];
}


@end
