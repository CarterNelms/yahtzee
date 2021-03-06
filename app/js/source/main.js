(function()
{
	'use strict';

	$(document).ready(initialize);

	var currentUser = 0;
	var currentRoll = 0;
	var frozen;
	var numDice;

	function initialize()
	{
		$('#add').click(add);
		$('.arrow').click(arrow);
		$('body').keydown(move);
		$('#add-score').click(addScore);
		$('#roll').click(roll);
		$('.dice').click(freeze);

		frozen = 0;
		numDice = $('.dice').length;
	}

	function freeze()
	{
		$(this).toggleClass('frozen');
	}

	function roll()
	{
		var $dice = $('.dice:not(.frozen)');
		var numRolls = $dice.length;
		for(var i = 0; i < numRolls; ++i)
		{
			var num = Math.floor(6 * Math.random()) + 1;
			$($dice[i]).attr('src', 'media/images/dice/die' + num + '.png');
		}
	}

	function addScore(event)
	{
		var score = $('#score').val() * 1;
		$('.horizontal .vertical').text(score);
		event.preventDefault();
	}

	function move(event)
	{
		var key = event.keyCode;
		if(key >= 37 && key <= 40)
		{
			event.preventDefault();
		}

		switch(event.keyCode)
		{
			case 38:
				--currentUser;
				break;
			case 40:
				++currentUser;
				break;
			case 37:
				--currentRoll;
				break;
			case 39:
				++currentRoll;
		}
		paintTable();
	}

	function arrow()
	{
		switch(this.id)
		{
			case 'up':
				--currentUser;
				break;
			case 'down':
				++currentUser;
				break;
			case 'left':
				--currentRoll;
				break;
			case 'right':
				++currentRoll;
		}
		paintTable();
	}

	function paintTable()
	{
		clampTableVars();

		$('.horizontal').removeClass('horizontal');
		$('.vertical').removeClass('vertical');

		var $tr = $($('#game > tbody > tr')[currentUser]);
		$tr.addClass('horizontal');

		$('#game > tbody > tr > td:nth-child(' + (currentRoll + 3) + ')').addClass('vertical');
	}

	function clampTableVars()
	{
		var firstUser = 0;
		var lastUser = $('#game > tbody >tr').length - 1;
		var firstRoll = 0;
		var lastRoll = 12;

		currentUser = (currentUser < firstUser) ? lastUser : currentUser;
		currentUser = (currentUser > lastUser) ? firstUser : currentUser;
		currentRoll = (currentRoll < firstRoll) ? lastRoll : currentRoll;
		currentRoll = (currentRoll > lastRoll) ? firstRoll : currentRoll;
	}

	function add(event)
	{
		var username = $('#username').val();
		var avatar = $('#avatar').val();

		createRow(username, avatar);
		paintTable();

		event.preventDefault();
	}

	function createRow(username, avatar)
	{
		var $tr = $('<tr>');
		//var tds = [];

		for(var i = 0; i < 16; ++i)
		{
			//tds.push('<td></td>');
			$tr.append($('<td>'));
		}

		//$tr.append(tds);
		$('#game > tbody').append($tr);

		var count = $('#game > tbody > tr').length;
		if(count === 1)
		{
			$tr.addClass('horizontal');
		}

		var $img = $('<img>');
		$img.attr('src', avatar);
		$img.addClass('avatar');

		$tr.children('td:nth-child(1)').append($img);
		$tr.children('td:nth-child(2)').text(username);
		$tr.children('td:nth-child(3)').addClass('vertical');
	}
})();