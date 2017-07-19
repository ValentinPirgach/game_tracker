class GamesController < ApplicationController
  skip_before_filter :verify_authenticity_token
  
  def index
    @game = Game.all
    #code
  end

  def create
    @game = Game.new game_params

    if @game.save
      render :show
    else
      render_errors @game
    end
  end


  def show
  end

  private
  def game_params
    params.require(:game).permit(:name, :store)
    #code
  end
end
