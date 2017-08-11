import os
import random
import json
import copy
from functools import reduce
from flask import Flask, request, render_template, Response, jsonify
from flask_restful import Resource, Api

# create the app object
app = Flask(__name__)
api = Api(app)


# define type of question that can be asked
question_id_serial = 3
questions = {
    1: {
        'id': 1,
        'question': 'Is this hard?',
    },
    2: {
        'id': 2,
        'question': 'Who is going to win the SuperBowl in 2018?',
    },
    3: {
        'id': 3,
        'question': 'What is your favorite Tesla vehicle?',
    }
}


# define the answers
answer_id_serial = 10
answers = {
    1: {
        'id': 1,
        'question_id': 1,
        'answer': 'Yes',
        'count': 0
    },
    2: {
        'id': 2,
        'question_id': 1,
        'answer': 'No',
        'count': 0
    },
    3: {
        'id': 3,
        'question_id': 2,
        'answer': 'Eagles',
        'count': 0
    },
    4: {
        'id': 4,
        'question_id': 2,
        'answer': 'Patriots',
        'count': 0
    },
    5: {
        'id': 5,
        'question_id': 2,
        'answer': 'Seahawks',
        'count': 0
    },
    6: {
        'id': 6,
        'question_id': 2,
        'answer': 'Broncos',
        'count': 0
    },
    7: {
        'id': 7,
        'question_id': 3,
        'answer': 'Roadster',
        'count': 0
    },
    8: {
        'id': 8,
        'question_id': 3,
        'answer': 'Model S',
        'count': 0
    },
    9: {
        'id': 9,
        'question_id': 3,
        'answer': 'Model X',
        'count': 0
    },
    10: {
        'id': 10,
        'question_id': 3,
        'answer': 'Model 3',
        'count': 0
    }
}

answered = list(range(1, len(questions) + 1, 1))
repeat = False
active = {}
total_survey_answer = 0
chart_nums = 0
# defined the Answer class
# return single answer


class Answer(Resource):
    def get(self, question_id):
        res = []
        for el in answers.values():
            if el['question_id'] == question_id:
                res.append(el)
        return res

    def put(self, answer_id):
        answer = answers[answer_id]
        data = request.get_json()
        values = {k: data.get(k, v) for k, v in answer.items()}
        answers[answer_id].update(values)
        return values

    def delete(self, answer_id):
        values = answers[answer_id]
        del answers[answer_id]
        return values


class Answers(Resource):
    def get(self):
        return answers.values()

    def post(self):
        global answer_id_serial
        answer_id_serial += 1
        data = request.get_json()
        values = {
            'id': answer_id_serial,
            'answer': data['answer'],
            'count': data.get('count', 0),
            'question_id': data['question_id']
        }

        answers[answer_id_serial] = values
        return values


class Question(Resource):
    def get(self, question_id):
        data = questions[question_id].copy()
        data['answers'] = [ans for ans in answers.values() if ans['question_id'] == question_id]
        return data

    def put(self, question_id):
        question = questions[question_id]
        data = request.get_json()
        data.pop('answers', [])
        values = {k: data.get(k, v) for k, v in question.items()}
        questions[question_id].update(values)
        values['answers'] = [ans for ans in answers.values() if ans['question_id'] == question_id]
        return values

    def delete(self, question_id):
        values = questions[question_id]
        del questions[question_id]
        values['answers'] = [ans for ans in answers.values(
        ) if ans['question_id'] == question_id]
        return values


class Questions(Resource):
    def get(self):
        output = []
        for question in questions.values():
            question = question.copy()
            question['answers'] = [ans for ans in answers.values(
            ) if ans['question_id'] == question['id']]
            output = question
        return output

    def post(self):
        global question_id_serial
        question_id_serial += 1
        data = request.get_json()
        values = {
            'id': question_id_serial,
            'question': data['question']
        }
        questions[question_id_serial] = values
        return values


api.add_resource(Questions, '/questions')
api.add_resource(Question,  '/questions/<int:question_id>')
api.add_resource(Answers,   '/answers')
api.add_resource(Answer,    '/answers/<int:answer_id>')


# server handling from here

@app.route('/')
def show_root():
    global active
    global total_survey_answer
    active.clear()
    active['home'] = True
    return render_template('home.html', active=active, total_survey_answer=total_survey_answer)

@app.route('/home', methods=['GET', 'POST'])
def show_home():
    global active
    global total_survey_answer
    if request.method == 'POST':
        """for the add and reset button"""
        if 'reset' in request.form:
            active.clear()
            active['reset'] = True
            for el in answers.values():
                el['count'] = 0;
            return jsonify({'answers' : answers})
        elif 'add' in request.form:
            active.clear()
            active['add'] = True
            for el in answers.values():
                el['count'] += random.randint(1, 9);
            return jsonify({'answers' : answers})
    total_survey_answer = reduce(lambda x, y: x + y, map(lambda x: x['count'], answers.values()))
    return render_template('home.html', active=active, total_survey_answer=total_survey_answer)

@app.route('/about')
def show_about():
    global active
    active.clear()
    active['about'] = True
    return render_template('about.html', active=active)

@app.route('/summary', methods=['GET', 'POST'])
def show_summary():
    global total_survey_answer
    global chart_nums
    global active
    if request.method == 'POST':
        if 'report' in request.form:
            active.clear()
            active['report'] = True
        all_data = {}
        for qst in questions.values():
            obj = {}
            obj['title'] = qst['question']
            obj['detail'] = copy.deepcopy(filter(lambda x: x['question_id'] == qst['id'], answers.values()))
            all_data[qst['id']] = obj
        return jsonify({'all_data' : all_data})
    chart_nums = range(1, len(questions) + 1)
    total_survey_answer = reduce(lambda x, y: x + y, map(lambda x: x['count'], answers.values()))
    return render_template('summary.html', chart_nums=chart_nums, total_survey_answer=total_survey_answer, active=active, question_nums=len(chart_nums))


@app.route('/survey', methods=['POST', 'GET'])
def show_survey():
    global active
    global repeat
    global question_id
    global answered
    if request.method == 'GET':
        seq = '%s / %s' % ((len(questions) - len(answered) + 1), len(questions))
        num = random.choice(answered)
        answered.remove(num)
        # refill the answered list
        if not answered:
            answered = list(range(1, len(questions) + 1, 1))
            repeat = True
        else:
            repeat = False
        qst = Question().get(num)
        ans = Answer().get(num)
    else:
        if 'restart' in request.form:
            answered = range(1, len(questions) + 1)
            return jsonify({'answered': answered})
        else:
            answer = request.form.getlist('answer')[0]
            count = request.form.getlist('count')[0]
            question_id = request.form.getlist('question_id')[0]
            question = request.form.getlist('question')[0]

            for el in answers.values():
                if str(el['question_id']) == question_id and el['answer'] == answer:
                    el['count'] += 1
                    break

            result = copy.deepcopy(filter(lambda x: x['answer'] == answer, answers.values())[0])
            results = copy.deepcopy(filter(lambda x: x['question_id'] == int(question_id), answers.values()))
            for el in results:
                del el['question_id']
            return jsonify({'count': result['count'], 'question_id': result['question_id'], 'answer': result['answer'], 'results': results, 'question': question});

    active.clear()
    return render_template('survey.html', qst=qst, ans=ans, repeat=repeat, seq=seq, active=active)


@app.route('/assets/<path:path>')
def get_resource(path):
    mimetypes = {
        '.css': 'text/css',
        '.html': 'text/html',
        '.js': 'application/javascript'
    }
    content = open(path).read()
    return Response(content, mimetype=mimetypes[os.path.splitext(path)[1]])


if __name__ == '__main__':
    app.run(debug=False)
