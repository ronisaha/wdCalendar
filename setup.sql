SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

CREATE TABLE `jqcalendar` (
  `Id` int(11) NOT NULL auto_increment,
  `Subject` varchar(1000) character set utf8 default NULL,
  `Location` varchar(200) character set utf8 default NULL,
  `Description` varchar(255) character set utf8 default NULL,
  `StartTime` datetime default NULL,
  `EndTime` datetime default NULL,
  `IsAllDayEvent` smallint(6) NOT NULL,
  `Color` varchar(200) character set utf8 default NULL,
  `RecurringRule` varchar(500) character set utf8 default NULL,
  PRIMARY KEY  (`Id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;
