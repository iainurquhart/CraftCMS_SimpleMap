<?php
namespace Craft;

class SimpleMapPlugin extends BasePlugin
{

	function getName()
	{
		 return Craft::t('Simple Map');
	}

	function getVersion()
	{
		return '0.1';
	}

	function getDeveloper()
	{
		return 'Iain Urquhart';
	}

	function getDeveloperUrl()
	{
		return 'http://iain.co.nz';
	}

}