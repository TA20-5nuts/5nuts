import csv
class FoodData:
    def __init__(self):
        self.food_name = food_name
        self.food_info = food_info

    def set_food_name(self, food_name):
        pass

    def get_food_info(self):
        return self.food_info

    def get_stat_data(self):
        return self.stat_data

    def get_web_links(self):
        f = open("./.data/WebLinks.csv", "r", encoding='utf-8-sig')
        reader = csv.reader(f)
        weblinks_info = []
        for row in reader:
            weblinks_info.append(row)
        f.close
        return self.weblinks_info

class QuizData:

    def __init__(self):
        self.quiz_form = quiz_form

    def set_quiz_form(self):
        pass

    def get_quiz_form(self):
        return self.quiz_form
# def get_food_name(self):
    #     return self.food_name
