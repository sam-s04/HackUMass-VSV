function calcScore(user_grid, correct_grid) {
    user_ans = user_grid.getGrid();
    corr_ans = correct_grid.getGrid();
    score = 0;
    for (i = 0; i < user_ans.length; i++) {
        // Get element by ID and compare colors
        elem1 = html.getElementById();
        elem2 = html.getElementById();
        // if elem1.getComputedStyle().fill == elem2.getComputedStyle().fill
        // Score += 1
    }
    return score / (user_ans.length * user_ans[0].length);
}