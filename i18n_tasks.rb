require 'json'
require 'set'

# USAGE:
#   $ ruby i18n_tasks.rb

def extract_used_translations
  system('npm run extract-translations')
end

def print_hr
  puts '=' * 18
end

def process(used_i18n_keys, i18n_data)
  missing_keys = Set.new
  formatted_hash = {}

  used_i18n_keys.each do |key|
    begin
      formatted_hash[key] = i18n_data.fetch(key)
    rescue KeyError => e
      missing_keys << key
    end
  end
  { formatted: formatted_hash, missing_keys: missing_keys }
end

# File paths
template_file = 'used_i18n.json'
i18n_file = 'src/assets/i18n/en.json'
outfile = 'formatted_i18n.json'

# ============
# === MAIN ===
# ============

extract_used_translations # Find used translations in project

# Read template file (contains all used i18n-keys)
json_string = File.read(template_file)
used_i18n_keys = JSON.parse(json_string).keys

puts "#{used_i18n_keys.length} I18n-strings in usage"

# Read I18n current source file
i18n_json_string = File.read(i18n_file)
i18n = JSON.parse(i18n_json_string)

result = process(used_i18n_keys, i18n)
missing_keys = result[:missing_keys]
formatted = result[:formatted]

# Print result
print_hr
if missing_keys.empty?
  puts 'Yay, no missing en keys!'
else
  puts "#{missing_keys.length} missing en keys found:"
  puts missing_keys.to_a
end
print_hr

File.write(outfile, JSON.pretty_generate(formatted))
puts "Formatted: #{formatted.length} I18n-strings to #{outfile}"
