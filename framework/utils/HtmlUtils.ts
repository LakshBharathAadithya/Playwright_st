import CommonConstants from "../constants/CommonConstants";
import DateUtil from "./DateUtils";
import fs from 'fs';

export default class HtmlUtils {

    public static generateHTMLReport(startTime: string, passed: number, failed: number, skipped: number, total: number) {
        const endTime = DateUtil.dateGenerator(CommonConstants.DATE_TIME_FORMAT, 0, 0, 0);
        const difference = DateUtil.getDurationBetweenDateTimes(startTime, endTime, CommonConstants.DATE_TIME_FORMAT);
        const duration = `${difference.hours}:${difference.minutes}:${difference.seconds}`;
        const template = this.getHTMLTemplate(startTime, endTime, duration, total, passed, failed, skipped);
        fs.writeFileSync(CommonConstants.STATISTICS_HTML_PATH, template);
        
    }


    private static getHTMLTemplate(startTime: string, endTime: string, duration: string, total: number,
        passed: number, failed: number, skipped: number) {
      let results = `<tr><th>PASSED</th><td><font color="#006400">${passed} (${((passed / total) * 100).toFixed(2)}%)</font></td></tr>`;                    
        if (failed !== 0) {
          results = `${results}<tr><th>FAILED</th><td><font color="#FF0000">${failed} (${((failed / total) * 100).toFixed(2)}%)</font></td></tr>`;
        }
        if (skipped !== 0) {
          results = `${results}<tr><th>SKIPPED</th><td><font color="#808080">${skipped} (${((skipped / total) * 100).toFixed(2)}%)</font></td></tr>`;
        }
        const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Statistics</title>
  <style>
    #table1 {
      font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
    #table1 td,
    #table1 th {
      border: 1px solid #ddd;
      padding: 8px;
    }
    #table1 tr:hover {
      background-color: #ddd;
    }
    #table1 th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      color: black;
    }
    #content {
      position: relative;
    }
    #table1 {
      width: 100%;
    }
  </style>
</head>
<body>
<div id="content_img">
<img src="https://i.ibb.co/Fx9P7Kf/sate.png" alt="sate" border="0" height="50 width="150"/>
</div>
<table width="100%">
<tr><th style="color:darkblue;text-align: left;font-size:0px;"></th><td></td></td></tr>
<tr><td width="50%">
    <table id="table1" width="100%">
    <tr><th>Environment URL</th><td><a href="${process.env.BASE_URL}"/>${process.env.BASE_URL}</td></tr>    
    <tr><th>Start Time</th><td>${startTime}</td></tr>
    <tr><th>End Time</th><td>${endTime}</td></tr>
    <tr><th>Duration</th><td>${duration}</td></tr>
    <tr><th>Total Tests</th><td>${total}</td></tr>
    ${results}
    </table>
</td></tr>
</table>
</body>
</html>
`;
        return template;
    }
}