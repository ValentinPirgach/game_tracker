Rails.application.routes.draw do
  resources :games, only: [:index, :show, :create]

  root 'home#index'
  get '*path' => 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
