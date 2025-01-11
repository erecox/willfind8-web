<?php
/*
 * LaraClassifier - Classified Ads Web Application
 * Copyright (c) BeDigit. All Rights Reserved
 *
 * Website: https://laraclassifier.com
 * Author: BeDigit | https://bedigit.com
 *
 * LICENSE
 * -------
 * This software is furnished under a license and may be used and copied
 * only in accordance with the terms of such license and with the inclusion
 * of the above copyright notice. If you Purchased from CodeCanyon,
 * Please read the full License from here - https://codecanyon.net/licenses/standard
 */

namespace App\Helpers\Search\Traits;

use Illuminate\Support\Facades\DB;

trait SelectForSuggestion
{
	protected function setSelect($hidden = []): void
	{
		if (!(isset($this->posts) && isset($this->postsTable))) {
			return;
		}

		// Default Select Columns
		$select = [
			$this->postsTable . '.id',
			'category_id',
			'title',
			$this->postsTable . '.price',
			'city_id'
		];

		// Default GroupBy Columns
		$groupBy = [$this->postsTable . '.id'];

		// Merge Columns
		$this->select = $select;
		$this->groupBy = array_merge($this->groupBy, $groupBy);

		// Add the Select Columns
		if (!empty($this->select)) {
			foreach ($this->select as $column) {
				$this->posts->addSelect($column);
			}
		}

		// If the MySQL strict mode is activated, ...
		// Append all the non-calculated fields available in the 'SELECT' in 'GROUP BY' to prevent error related to 'only_full_group_by'
		if (self::$dbModeStrict) {
			$this->groupBy = $this->select;
		}

		// Price conversion (For the Currency Exchange plugin)
		$this->posts->addSelect(DB::raw('(' . DB::getTablePrefix() . $this->postsTable . '.price * ?) AS calculatedPrice'));
		$this->posts->addBinding(config('selectedCurrency.rate', 1), 'select');
	}
}
