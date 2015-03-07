<?php
namespace Craft;

class SimpleMap_MarkerFieldType extends BaseFieldType
{

	public function getName()
	{
		return Craft::t('Simple Map Marker');
	}

	public function getInputHtml($name, $value)
	{

		$id = craft()->templates->formatInputId($name);
		$namespacedId = craft()->templates->namespaceInputId($id);

		$this->addAssets();

		craft()->templates->includeJs("$(function() { $('#{$namespacedId}-map-wrapper').simpleMap(); });");

		return craft()->templates->render(
			'simplemap/marker/input', array(
				'name'  	=> $name,
				'value' 	=> $value,
				'id'		=> $id,
				'settings' 	=> $this->getSettings()
			)
		);
	}

	protected function defineSettings()
	{
		// https://plus.google.com/108894548547228430168/posts/BZC2CZ1dG33
		return array(
			'defaultLat' => array(AttributeType::String, 'required' => true),
			'defaultLong' => array(AttributeType::String, 'required' => true),
			'zoom' => AttributeType::String
		);
	}

	public function getSettingsHtml()
	{

		$namespacedId = craft()->templates->namespaceInputId('');

		$this->addAssets();
		craft()->templates->includeJs("$(function() { $('#{$namespacedId}map-wrapper').simpleMap(); });");

		return craft()->templates->render(
			'simplemap/marker/settings', array(
				'settings' => $this->getSettings(),
				'id' => $namespacedId
			)
		);
	}

	public function defineContentAttribute()
	{
		return AttributeType::Mixed;
	}

	private function addAssets()
	{
		craft()->templates->includeJsFile('//maps.googleapis.com/maps/api/js?sensor=false&libraries=places');
		craft()->templates->includeJsResource('simplemap/js/SimpleMarker.js');
		craft()->templates->includeCssResource('simplemap/css/global.css');
	}

}

