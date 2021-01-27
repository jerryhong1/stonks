# Regretless Robinhood 

## Overview
We want to build a website to help new stock traders become familiar with the financial system. Specifically, we will build a website called Regretless Robinhood that will enable users to paper trade (i.e. trade stocks with fake money). Our target users are young adults who want to trade but have little to no experience with stocks. 

## Why should we build this? 
According to our needfinding interviews, we discovered that many new traders or people who want to trade wish they had a de-risked environment to test their trading skills. They wanted to get the hang of trading without the potential of losing their money. An interviewee, Tommy, stated he had always wanted to start paper trading but has not done so because you “need high willpower or discipline to build the paper trading system yourself.” He thinks Regretless Robinhood can fill that gap. 
## MVP 
For our MVP, we hope to deliver the basic functionality to support paper trading. The feature list and user journey is as follows: 

<table cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
    <tbody>
        <tr>
            <td style="width: 25.3695%; height: 32.7px; border-style: solid; border-width: 1px; border-color: rgb(0, 0, 0); padding: 6.7px;" valign="top">
                <p style="margin: 0.0px 0.0px 0.0px 0.0px; line-height: 17.0px;"><strong>User Journey</strong></p>
            </td>
            <td style="width: 34.4827%; height: 32.7px; border-style: solid; border-width: 1px; border-color: rgb(0, 0, 0); padding: 6.7px;" valign="top">
                <p style="margin: 0.0px 0.0px 0.0px 0.0px; line-height: 17.0px;"><strong>Features Involved</strong></p>
            </td>
            <td style="width: 83.7px; height: 32.7px; border-style: solid; border-width: 1.0px 1.0px 1.0px 1.0px; border-color: #000000 #000000 #000000 #000000; padding: 6.7px 6.7px 6.7px 6.7px;" valign="top">
                <p style="margin: 0.0px 0.0px 0.0px 0.0px; line-height: 17.0px;"><strong>Page/Views involved</strong></p>
            </td>
        </tr>
        <tr>
            <td style="width: 25.3695%; height: 287.7px; border-style: solid; border-width: 1px; border-color: rgb(0, 0, 0); padding: 6.7px;" valign="top">
                <p style="margin: 0.0px 0.0px 0.0px 0.0px; line-height: 17.0px;">User creates account</p>
            </td>
            <td style="width: 34.4827%; height: 287.7px; border-style: solid; border-width: 1px; border-color: rgb(0, 0, 0); padding: 6.7px;" valign="top">
                <ul>
                    <li style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; line-height: 17px;">Account creation</li>
                    <li style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; line-height: 17px;">Profile configuration: enter starting amount</li>
                </ul>
            </td>
            <td style="width: 83.7px; height: 287.7px; border-style: solid; border-width: 1.0px 1.0px 1.0px 1.0px; border-color: #000000 #000000 #000000 #000000; padding: 6.7px 6.7px 6.7px 6.7px;" valign="top">
                <ul>
                    <li style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; line-height: 17px;">Account creation</li>
                    <li style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; line-height: 17px;">Create/configure profile</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td style="width: 25.3695%; height: 321.7px; border-style: solid; border-width: 1px; border-color: rgb(0, 0, 0); padding: 6.7px;" valign="top">
                <p style="margin: 0.0px 0.0px 0.0px 0.0px; line-height: 17.0px;">User learns more about a stock</p>
            </td>
            <td style="width: 34.4827%; height: 321.7px; border-style: solid; border-width: 1px; border-color: rgb(0, 0, 0); padding: 6.7px;" valign="top">
                <ul>
                    <li style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; line-height: 17px;">View stock: 1 month retro stock chart, other metrics</li>
                </ul>
            </td>
            <td style="width: 83.7px; height: 321.7px; border-style: solid; border-width: 1.0px 1.0px 1.0px 1.0px; border-color: #000000 #000000 #000000 #000000; padding: 6.7px 6.7px 6.7px 6.7px;" valign="top">
                <ul>
                    <li style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; line-height: 17px;">Home page: all available stocks are accessed here. Summary of user portfolio here</li>
                    <li style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; line-height: 17px;">Individual stock page: detailed information of stock viewed here</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td style="width: 25.3695%; height: 150.7px; border-style: solid; border-width: 1px; border-color: rgb(0, 0, 0); padding: 6.7px;" valign="top">
                <p style="margin: 0.0px 0.0px 0.0px 0.0px; line-height: 17.0px;">User selects stocks to invest in</p>
            </td>
            <td style="width: 34.4827%; height: 150.7px; border-style: solid; border-width: 1px; border-color: rgb(0, 0, 0); padding: 6.7px;" valign="top">
                <ul>
                    <li style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; line-height: 17px;">Trade stock: market orders only, increase or decrease position in a stock</li>
                </ul>
            </td>
            <td style="width: 83.7px; height: 150.7px; border-style: solid; border-width: 1.0px 1.0px 1.0px 1.0px; border-color: #000000 #000000 #000000 #000000; padding: 6.7px 6.7px 6.7px 6.7px;" valign="top">
                <ul>
                    <li style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; line-height: 17px;">Individual stock page: detailed information of stock viewed here</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td style="width: 25.3695%; height: 151.7px; border-style: solid; border-width: 1px; border-color: rgb(0, 0, 0); padding: 6.7px;" valign="top">
                <p style="margin: 0.0px 0.0px 0.0px 0.0px; line-height: 17.0px;">User sells a stock</p>
            </td>
            <td style="width: 34.4827%; height: 151.7px; border-style: solid; border-width: 1px; border-color: rgb(0, 0, 0); padding: 6.7px;" valign="top">
                <ul>
                    <li style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; line-height: 17px;">Trade stock: &nbsp;market orders only, increase or decrease position in a stock</li>
                </ul>
            </td>
            <td style="width: 83.7px; height: 151.7px; border-style: solid; border-width: 1.0px 1.0px 1.0px 1.0px; border-color: #000000 #000000 #000000 #000000; padding: 6.7px 6.7px 6.7px 6.7px;" valign="top">
                <ul>
                    <li style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; line-height: 17px;">Individual stock page: detailed information of stock viewed here</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td style="width: 25.3695%; height: 168.7px; border-style: solid; border-width: 1px; border-color: rgb(0, 0, 0); padding: 6.7px;" valign="top">
                <p style="margin: 0.0px 0.0px 0.0px 0.0px; line-height: 17.0px;">User views portfolio performance</p>
            </td>
            <td style="width: 34.4827%; height: 168.7px; border-style: solid; border-width: 1px; border-color: rgb(0, 0, 0); padding: 6.7px;" valign="top">
                <ul>
                    <li style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; line-height: 17px;">View performance: overall and day % wins/losses can be viewed here</li>
                </ul>
            </td>
            <td style="width: 83.7px; height: 168.7px; border-style: solid; border-width: 1.0px 1.0px 1.0px 1.0px; border-color: #000000 #000000 #000000 #000000; padding: 6.7px 6.7px 6.7px 6.7px;" valign="top">
                <ul>
                    <li style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; line-height: 17px;">Home page: all available stocks are accessed here. Summary of user portfolio here</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td style="width: 25.3695%; height: 134.7px; border-style: solid; border-width: 1px; border-color: rgb(0, 0, 0); padding: 6.7px;" valign="top">
                <p style="margin: 0.0px 0.0px 0.0px 0.0px; line-height: 17.0px;">User&rsquo;s money runs out</p>
            </td>
            <td style="width: 34.4827%; height: 134.7px; border-style: solid; border-width: 1px; border-color: rgb(0, 0, 0); padding: 6.7px;" valign="top">
                <ul>
                    <li style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; line-height: 17px;">Restart profile: allows user to restart new portfolio with same account</li>
                </ul>
            </td>
            <td style="width: 83.7px; height: 134.7px; border-style: solid; border-width: 1.0px 1.0px 1.0px 1.0px; border-color: #000000 #000000 #000000 #000000; padding: 6.7px 6.7px 6.7px 6.7px;" valign="top">
                <ul>
                    <li style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; line-height: 17px;">Restart page: option to restart with a new fixed starting amount</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

This functionality allows the user to paper trade on a limited stock listing.  

## Team Matrix 
<div align="left" dir="ltr" style="margin-left:-13.5pt;">
    <table style="border:none;border-collapse:collapse;">
        <tbody>
            <tr style="height:40pt;">
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;text-align: center;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Member</span></p>
                </td>
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;text-align: center;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Skills</span></p>
                </td>
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;text-align: center;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Personal Traits</span></p>
                </td>
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;text-align: center;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Desired Growth</span></p>
                </td>
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;text-align: center;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Weaknesses</span></p>
                </td>
            </tr>
            <tr style="height:40pt;">
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Bihan&nbsp;</span></p>
                </td>
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Backend, python, django, basic web</span></p>
                </td>
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">I like long working sessions, structured working environment</span></p>
                </td>
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Learn web/fullstack, work w/ apis</span></p>
                </td>
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Webdev/frontend</span></p>
                </td>
            </tr>
            <tr style="height:55pt;">
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Tyler</span></p>
                </td>
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Systems, low level stuff, design help if you&rsquo;re desperate</span></p>
                </td>
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Works on/off in long bursts, usually ends up redesigning things multiple times, not funny</span></p>
                </td>
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Learn to develop a real product with a team</span></p>
                </td>
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Indecisive, sporadically motivated, talking to people</span></p>
                </td>
            </tr>
            <tr style="height:55pt;">
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Lauren</span></p>
                </td>
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Front end, prototyping, can help with design&nbsp;</span></p>
                </td>
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Likes working in teams when everyone is on the same page</span></p>
                </td>
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Learn full-stack to a higher proficiency&nbsp;</span></p>
                </td>
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Sometimes I procrastinate and then it&rsquo;s a rush to finish everything before the deadline&nbsp;</span></p>
                </td>
            </tr>
            <tr style="height:55pt;">
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Jerry</span></p>
                </td>
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Design, front end, basic data wrangling and vis in Python/D3</span></p>
                </td>
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Generally enthusiastic/cheerful, likes structure when working. Freezes up when I feel inadequate.</span></p>
                </td>
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Building something&nbsp;</span><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:italic;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">from scratch</span><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">; getting more design practice.&nbsp;</span></p>
                </td>
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Not an ambitious ideas guy; building engineering projects from the ground-up; tempted to spread thin</span></p>
                </td>
            </tr>
            <tr style="height:55pt;">
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Sejal&nbsp;</span></p>
                </td>
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Front end, design, Python lol</span></p>
                </td>
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Like to do everything from ground up, work in longer devoted sessions</span></p>
                </td>
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Learning to actually build something full-stack with no starter code</span></p>
                </td>
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Can get stressed if I go down a rabbithole alone</span></p>
                    <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;"><br><br></span></p>
                </td>
            </tr>
        </tbody>
    </table>
</div>


## Needfinding 

#### Interview #1: 
<ul>
<li>Background: what is their relationship with financial investment currently? </li> <ul>
<li>Currently invests because I want to grow my money </li>
<li>Stock habits </li> <ul>
<li>Check stocks daily </li>
<li>Is important because it’s a lever to grow money + has money in the market </li> </ul>
<li>If they do invest, how did they get started?</li>
<li>Parents told me to invest early </li> <ul>
<li>Also had enough money from internships </li> </ul>
<li>If they do invest, what are their rhythms?</li> <ul>
<li>Check stock daily because its part of his routine. Looking for major price changes. Changes position less than once a year only adding </li>
<li>What communities do they often go to for information?</li> <ul>
<li>Financial news (Barronsm specifically) - checks once per week </li>
<li>Parents and friends </li></ul> </ul></ul>
<li>Open-ended Exercise: Said would keep track of the money itself. Would want to try stocks that are untested, new, too risky for put real money into. Also would paper trade on stocks with long term potential. Would treat it daily like he checks his regular stocks. His goal is to learn about different stocks and trends in a de-risked way. </li>
<li>Proposal Response: Doesn’t like that you can just paper trade by yourself. If someone is committed enough to paper trade, it wouldn't be too hard to do it by themselves. But if someone really doesn’t have enough resources to learn how to trade, this would make it easy to startup because you do not need high willpower or discipline to build the paper trading system yourself. Likes how it makes the process easier because you don’t have to manually track stocks yourself. </li>
<li>Observation: “Walk me through how you might typically use (Robinhood). Think and comment out loud what you might observe.”</li> <ul>
<li>Likes robinhood process for setting up trades because it’s so easy and simplified but understands you have less flexibility for custom trade. TD is more complicated but you can do all types of trades. Likes how fast robinhood is. When looking daily, looking at stock chart, performance metrics like day % gain/loss. Wishes: When you add more money into the same stock, doesn’t show the strike price at which you added. Same for TD. Would like to see all strike prices when you add more money into an existing stock (ie recurring investment into Apple, would want to see each purchase price) </li></ul>
<li>Roadblocks, Pain Points: get a sense of what holds them back.</li><ul>
<li>Uses Robinhood and TD but would want easy way to transfer stock into just one account </li>
<li>For our project: would want user to set input amount (aka more than 1k for example) </li></ul> </ul>
  
#### Interview  #2: 
<ul>
<li>Background: what is their relationship with financial investment currently? </li><ul>
<li>Do you currently invest the money you make? Why/why not? </li> <ul>
<li>Yes because has lots of extra cash in checking account and should invest when you are young </li>
<li>Check stocks 2+ times daily, reads about long term trends or major news events, but not day to day </li>
<li>Is important to think about this space because 1) want money to be put to good use 2) educational experience for financial knowledge and how businesses work or don’t </li></ul>
<li>If they do invest, how did they get started?</li><ul>
<li>Started internship in forex a few years ago</li>
<li>Stock started with robinhood </li>
<li>Heard friends talking about it so got interested in investing, also making account on robinhood was super easy </li></ul>
<li>If they do invest, what are their rhythms? How often do you, say, check your stocks? What triggers the check — notification, news, a certain time?</li> <ul>
<li>Check when market open/close, lunch break, not really looking for anything when checking, more out of habit  </li></ul>
<li>What communities do they often go to for information?</li><ul>
<li>Friends mostly and intuition </li></ul></ul>
<li>Open-ended Exercise: Question: how long term am I keeping this money? If it’s years, probably put into an index. Would only want to trade on magnitude of years </li>
<li>Proposal Response: Don’t think good investing habits are built in short term investments so skeptical that paper trade can totally fill that gap. Also doesn’t think investing should be a “fun” thing because you can potentially lose a lot of money. Thinks this could be good use case for call or puts / options trading actually just to get used to how those trading options work. </li>
<li>Observation: “Walk me through how you might typically use (Robinhood). Think and comment out loud what you might observe.”</li><ul>
<li>Looks at the home page the most (the aggregate gain or loss for the day). Wishes he could see more clearly his stock portfolio breakdown since right now has to click into each stock to see what percentage of total it is. </li></ul>
<li>Roadblocks, Pain Points</li><ul>
<li>Would want easier access to portfolio level statistics </li>
<li>De-risked way to understand options trading </li></ul>
<li></li></ul>

#### Interview #3
<ul> <li>Does not use Robinhood or invest in individual stocks</li> <ul>
<li>Only invests in index funds, safer</li></ul>
<li>Wants to use a riskless investing app for fun just to see how much they could make off of the market</li><ul>
<li>Views stock investments as more of a game/gambling but doesn’t want to risk losing real money</li></ul>
<li>Open ended exercise</li><ul>
<li>First thing they do is search up volatile stocks</li><ul>
<li>Want to invest in volatile stocks because it's more exciting and you may as well if you’re not risking anything</li>
<li>Would want to check on and trade stocks frequently, potentially multiple times a day, in order to maximize potential gains</li></ul>
<li>Does not want to dig too deep into reports and financial documents since that’s too much effort for what they see as a game</li><ul>
<li>Only cares about the fluctuation of the stock’s value over time</li>
<li>Doesn’t care about learning more about real world investing, just wants to have fun</li></ul></ul>
<li>Regretless robinhood proposal</li><ul>
<li>Sees it as a fun game that they want to play because it would be neat to see how well you could theoretically do</li><ul>
<li>Compete for bragging rights over being able to predict the markets best</li></ul>
<li>Doesn’t see it as applicable to the real world since the lack of risk and limitations encourages very different investment strategies</li></ul></ul>

#### Interview #4

<ul> <li>Invests in individual stocks in robinhood</li><ul>
<li>One time money transfer into robinhood</li>
<li>Checks often, buys low/sells high about once a week</li>
<li>Owns about 4 stocks at a time, sells 1 or 2 at a time</li>
<li>Only looks at charts</li>
<li>Mostly invests in tech, auto</li>
<li>Started bc friends do it, stayed bc making money</li>
<li>Fun to double money, useful to learn to invest</li>
<li>Sees it as educational and as a game</li></ul>
<li>Open ended exercise</li><ul>
<li>Try to diversify, put in many stocks</li>
<li>Put it into safe stocks that they know do well</li>
<li>If risk-free would go for riskier stocks just to see what would happen</li>
<li>All in on GME</li></ul>
<li>Proposal</li><ul>
<li>Would enjoy exploring more volatile stocks</li>
<li>Would trade at same rate or less frequently</li>
<li>If there was a leaderboard, would want to be at the top (sees as game)</li>
<li>Would have to pay more attention</li>
<li>Sees this mostly as a game</li>
<li>If they wanted to do something educational/learn they’d just do it in robinhood and make money off of it (bc presumably you’ll learn to get good and make money pretty quickly)</li>
<li>Likes the name Pigeonhat</li></ul>
<li>Pain points</li><ul>
<li>Better history of previous buys/sells to track your performance over time</li>
<li>Wants to evaluate personal stock picking performance</li>
<li></li></ul></ul>

#### Interview #5:
<ul><li>Background: what is their relationship with financial investment currently? </li>
<li>Do you currently invest the money you make? Why/why not?</li><ul>
<li>“Yes, because that’s how you make money over time relatively risk free.”</li></ul>
<li>Do you keep up with the stock market or anything in the financial world? How important is that space to you and why?</li><ul>
<li>2 on a scale of 1-5. Keep up if anything interesting. More so care about how the stock market is doing in aggregate rather than specific stocks. </li></ul>
<li>If they do invest, how did you get started?</li><ul>
<li>Summer before college, decided to open a vanguard account and invest in mutual funds because parents said it was the smart thing to do.</li></ul>
<li>If they do invest, what are your rhythms? How often do you, say, check your stocks? What triggers the check — notification, news, a certain time?</li><ul>
<li>Once every 2 months</li></ul>
<li>What communities do you often go to for information?</li><ul>
<li>If it’s large enough info, will hear from news</li></ul></ul>
