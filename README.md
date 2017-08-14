# Story Write Up

This is an functional app for survey purpose built in Python Flask and jQuery.

[LIVE][survey]

## The view of app

- Home page

    <img src="https://github.com/zidianlyu/survey_challenge/blob/master/docs/fullview.png" align="center" width="600" overflow="hidden">

## Steps to run

```
pip install -r requirements.txt
python server.py
```

## Features

### MVP

1. The website will randomly draw a question from backend for the user to answer. The UI will displace the question with all the possible options.

    <img src="https://github.com/zidianlyu/survey_challenge/blob/master/docs/question.png" align="center" width="400" overflow="hidden">

2. The backend will interact with the user and update the count of answer selected in the backend.

3. Right after an answered be submitted, the user can view the statistic of the answer chosen. And the UI will provide the user a choice to moving forward.

    <img src="https://github.com/zidianlyu/survey_challenge/blob/master/docs/forward.png" align="center">

4. When the user answered the whole set of questions once(without repetition), the user can choose or view all the collected data's statistic or continue to restart the answering question process.

    <img src="https://github.com/zidianlyu/survey_challenge/blob/master/docs/finish.png" align="center">

### Extra Features

1. User has right to **add random answers** or **clear all the answers** to the back end server.

    <img src="https://github.com/zidianlyu/survey_challenge/blob/master/docs/right1.png" align="center" width="300" overflow="hidden">

    <img src="https://github.com/zidianlyu/survey_challenge/blob/master/docs/right2.png" align="center" width="300" overflow="hidden">

2. **Page guidance**, the user can follow the _yellow arrow_ to try each functional feature.

3. **Data visualization**, the user can view the statistic for each question in a _bar chart_ after each submit, and view all the data statistic in some _doughnut charts_ after the user finish the set of questions.

- Bar chart

    <img src="https://github.com/zidianlyu/survey_challenge/blob/master/docs/barchart.png" align="center" width="400" overflow="hidden">

- Doughnut chart

    <img src="https://github.com/zidianlyu/survey_challenge/blob/master/docs/doughnutchart.png" align="center" width="400" overflow="hidden">

4. **A float site tool bar**, the user can easily access all the features mentioned above in the tool bar.

    <img src="https://github.com/zidianlyu/survey_challenge/blob/master/docs/toolbar.png" align="center">

5. **Number animation**, the count for total answers will be display dynamically in the UI.

6. **Page loading effect**, a page loader was designed for smoothly render the transition of each page.

7. **Sliding effect**, an effect under page guidance that gives users more responses.

    <img src="https://github.com/zidianlyu/survey_challenge/blob/master/docs/slideeffect.png" align="center">

## Project Management

### File Structure

#### Templates

```
index.html(/)
    - includes
        - navbar.html
        - toolbar.html
    - home.html
    - survey.html
    - summary.html
    - about.html
```

#### Styling

```
index.html(root)
    - <head>
        - css/site.css
            - component1.css
            - component2.css
            ...
        - css/ext/external_library.css
```

#### Javascript

```
index.html(root)
    - <body>
        - js/site scripts
        - js/ext/external scripts
```

## Issues Fixed

##### In the Back End, server.py

1. Import extra library that I need to use
```Python
import random
import json
import copy
from functools import reduce
from flask import jsonify, send_from_directory
```

2. Change in Answer class
```Python
"""Change to get method to get multiple results rather than just getting a single result"""
class Answer(Resource):
    def get(self, question_id):
        res = []
        for el in answers.values():
            if el['question_id'] == question_id:
                res.append(el)
        return res
```

3. When sending data in POST request, using jsonify to return key value pair object to Front end
```Python
return jsonify({'answers': answers})
```

4. Return supportive data object to Front End to build the visual chart
```Python
return render_template('summary.html', chart_nums=chart_nums, total_survey_answer=total_survey_answer, active=active, question_nums=len(chart_nums))
```

5. To specify the file path in the server and avoid file path reading errors

```Python
@app.route('/assets/<path:path>')
def get_resource(path):
    mimetypes = {
        '.css': 'text/css',
        '.html': 'text/html',
        '.js': 'application/javascript'
    }

    content = open(path).read()
    return Response(content, mimetype=mimetypes[os.path.splitext(path)[1]])

```

To
```Python
@app.route('/js/<path:path>')
def get_js(path):
    return send_from_directory('js', path)

@app.route('/css/<path:path>')
def get_css(path):
    return send_from_directory('css', path)

@app.route('/html/<path:path>')
def get_html(path):
    return send_from_directory('html', path)
```


##### Modify external libraries, in index.html


1. Remove those extra reference files, as they were not provided and I am not using it
```HTML
<script src="/assets/js/ext/underscore.js" type="text/javascript"></script>
<script src="/assets/js/ext/backbone.js" type="text/javascript"></script>
```

2. Replace the provided jQuery library with a newer version
```HTML
<script src="/js/ext/jquery-3.2.1.min.js" type="text/javascript"></script>
```

## DevOps and Deployment

##### The project is tested to be deployable on Heroku

[Heroku]: (https://www.heroku.com)

The project is compatible with both Python 2.7.13 and Python 3.6.2


## Reference and citations

[Bootstrap](http://getbootstrap.com/)

[Chartjs](http://www.chartjs.org/)

[FakeLoader](http://joaopereirawd.github.io/fakeLoader.js/)

[Fontawesome](http://fontawesome.io/)

[Tesla Logo](https://commons.wikimedia.org/wiki/File:Tesla_Motors_Logo.svg)

[Tesla T Symbol](https://commons.wikimedia.org/wiki/File:Tesla_Motors.svg)

## Appendix 1: Requests design flow chart

- Requests design flow chart

    <img src="https://github.com/zidianlyu/survey_challenge/blob/master/docs/Requests_flow_chart%20.png" align="center" width="600" overflow="hidden">

## Appendix 2: UI design flow chart

- UI design flow chart

    <img src="https://github.com/zidianlyu/survey_challenge/blob/master/docs/UI_design_flow_chart.png" align="center" width="600" overflow="hidden">

[survey]: https://surveychallenge.herokuapp.com/
