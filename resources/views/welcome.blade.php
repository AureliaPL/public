<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{ url(mix('css/app.css')) }}"/>
    <title>{{config('app.name')}}</title>
</head>
<body>
<div id="app">
</div>

<script src="{{ url(mix('js/app.js')) }}"></script>
</body>
</html>
