# encoding: utf-8

Gem::Specification.new do |s|
  s.name          = "jekyll-cayman"
  s.version       = "0.0.1"
  s.authors       = ["Jason Long"]
  s.email         = ["support@github.com"]
  s.homepage      = "https://github.com/pages-themes/cayman"
  s.summary       = "Cayman is a clean, responsive theme for GitHub Pages"

  s.files         = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^((_includes|_layouts|_sass|assets)/|(LICENSE|README)((\.(txt|md|markdown)|$)))}i)
  end

  s.platform      = Gem::Platform::RUBY
  s.add_runtime_dependency "jekyll", "~> 3.2"
end
